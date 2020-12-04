/*
 * Created by Jimmy Lan
 * Creation Date: 2020-12-03
 */
import express, { Request, Response } from "express";
import {
  BadRequestError,
  UnprocessableEntityError,
  UserRole,
} from "@ly-letitfly/common";
import { ForbiddenError } from "@ly-letitfly/common/build/errors/ForbiddenError";
import { User } from "../models";

const router = express.Router();

router.patch(["/", "/:userId"], async (req: Request, res: Response) => {
  const body = req.body;
  const { userId } = req.params;

  const updateUserId = userId ? userId : req.user?.id;

  // Check for permission
  if (req.user?.role !== UserRole.admin && req.user?.id !== updateUserId) {
    throw new ForbiddenError();
  }

  // Check validity of name if it is defined
  if (body.name?.first?.length === 0 || body.name?.first?.length > 35) {
    throw new BadRequestError("First name is too short or too long.");
  }

  if (body.name?.last?.length === 0 || body.name?.last?.length > 35) {
    throw new BadRequestError("Last name is too short or too long.");
  }

  // User cannot update the following fields
  // during this request
  delete body.email?.primary;
  delete body.dateJoined;
  delete body._id;

  const user = await User.findById(updateUserId);
  if (!user) {
    throw new UnprocessableEntityError(`User ${updateUserId} is not found`);
  }
  user.set(body);
  user.save();

  return res.send({ success: true, data: user });
});

export { router as updateInfoRouter };
