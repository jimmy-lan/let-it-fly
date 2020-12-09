/*
 * Created by Jimmy Lan
 * Creation Date: 2020-12-07
 */

import express, { Request, Response, NextFunction } from "express";
import { param } from "express-validator";
import {
  BadRequestError,
  ForbiddenError,
  UserRole,
  validateRequest,
} from "@ly-letitfly/common";
import mongoose from "mongoose";

import { Friend } from "../models";

const router = express.Router();

const readFriends = async (req: Request, res: Response) => {
  const { userId } = req.params;

  const friendRelation = await Friend.findOne({ user: userId })
    .populate("friends")
    .exec();

  if (!friendRelation) {
    throw new BadRequestError(
      `Friend relation for user with id ${userId} is not found`
    );
  }

  return res.send({ success: true, data: friendRelation.friends });
};

router.get(
  "/",
  (req: Request, res: Response, next: NextFunction) => {
    req.params.userId = req.user!.id;
    next();
  },
  readFriends
);

router.get(
  "/:userId",
  [
    param("userId")
      .custom((userId: string) => mongoose.Types.ObjectId.isValid(userId))
      .withMessage("User ID must be a valid Object ID type."),
  ],
  validateRequest,
  (req: Request, res: Response, next: NextFunction) => {
    const { userId } = req.params;

    if (req.user!.role !== UserRole.admin && req.user!.id !== userId) {
      throw new ForbiddenError();
    }

    next();
  },
  readFriends
);

export { router as readFriendsRouter };
