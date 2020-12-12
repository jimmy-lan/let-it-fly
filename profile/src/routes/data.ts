/*
 * Created by Jimmy Lan
 * Creation Date: 2020-12-03
 */
import express, { Request, Response, NextFunction } from "express";
import {
  BadRequestError,
  UserRole,
  validateRequest,
  ForbiddenError,
} from "@ly-letitfly/common";
import { body, param } from "express-validator";
import mongoose from "mongoose";
import { User } from "../models";
import { UserInfoUpdateMsgSender } from "../messages/senders";
import { natsWrapper } from "../services";

const router = express.Router();

const patchUserData = async (req: Request, res: Response) => {
  const body = req.body;
  const { userId } = req.params;

  // Check validity of name if it is defined
  const firstName = body.personal?.name?.first;
  if (firstName?.length === 0 || firstName?.length > 35) {
    throw new BadRequestError("First name is too short or too long.");
  }

  const lastName = body.personal?.name?.last;
  if (lastName?.length === 0 || lastName?.length > 35) {
    throw new BadRequestError("Last name is too short or too long.");
  }

  // User cannot update the following fields
  // during this request
  if (req.user?.role !== UserRole.admin) {
    delete body.contact?.email?.primary;
    delete body.avatar;
  }
  delete body.dateJoined;
  delete body.id;
  delete body._id;

  const user = await User.findById(userId);
  if (!user) {
    throw new BadRequestError(`User ${userId} is not found`);
  }
  user.set(body);
  await user.save();

  // Emit user info update event
  await new UserInfoUpdateMsgSender(natsWrapper.client).send({
    id: user.id!,
    avatar: user.avatar,
    firstName: user.personal.name.first,
    lastName: user.personal.name.last,
    __v: user.__v,
  });

  return res.send({ success: true, data: user });
};

router.patch(
  "/:userId/data",
  [
    param("userId")
      .custom((userId: string) => mongoose.Types.ObjectId.isValid(userId))
      .withMessage("User ID must be a valid Object ID type."),
    body("contact.email.secondary").optional().isEmail(),
  ],
  validateRequest,
  async (req: Request, res: Response, next: NextFunction) => {
    const { userId } = req.params;

    // Check for permission
    if (req.user?.role !== UserRole.admin && req.user?.id !== userId) {
      throw new ForbiddenError();
    }

    next();
  },
  patchUserData
);

router.patch(
  "/data",
  [body("contact.email.secondary").optional().isEmail()],
  validateRequest,
  async (req: Request, res: Response, next: NextFunction) => {
    req.params.userId = req.user!.id;
    next();
  },
  patchUserData
);

export { router as dataRouter };
