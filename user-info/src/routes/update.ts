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

const router = express.Router();

const updateUserInfo = async (req: Request, res: Response) => {
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
  delete body.contact?.email?.primary;
  delete body.dateJoined;
  delete body.id;
  delete body._id;

  const user = await User.findById(userId);
  if (!user) {
    throw new BadRequestError(`User ${userId} is not found`);
  }
  user.set(body);
  user.save();

  return res.send({ success: true, data: user });
};

router.patch(
  "/:userId",
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
  updateUserInfo
);

router.patch(
  "/",
  [body("contact.email.secondary").optional().isEmail()],
  validateRequest,
  async (req: Request, res: Response, next: NextFunction) => {
    req.params.userId = req.user!.id;
    next();
  },
  updateUserInfo
);

export { router as updateInfoRouter };
