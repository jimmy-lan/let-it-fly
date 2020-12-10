/*
 * Created by Jimmy Lan
 * Creation Date: 2020-12-04
 */

import express, { Request, Response, NextFunction } from "express";
import { param } from "express-validator";
import mongoose from "mongoose";
import { Friend, User } from "../models";
import {
  BadRequestError,
  validateRequest,
  ForbiddenError,
} from "@ly-letitfly/common";

const router = express.Router();

const readUserInfo = async (req: Request, res: Response) => {
  const { userId } = req.params;

  const user = await User.findById(userId);

  if (!user) {
    throw new BadRequestError(`User ${userId} is not found`);
  }

  return res.send({ success: true, data: user });
};

const readUserAvatar = async (req: Request, res: Response) => {
  const { userId } = req.params;

  const user = await User.findById(userId, ["avatar"]);

  if (!user) {
    throw new BadRequestError(`User ${userId} is not found`);
  }

  return res.send({ success: true, data: user.avatar });
};

/**
 * Check whether the user <currentUserId> has permission to access
 * <readUserId> user's profile. If not, throw Forbidden error.
 * Otherwise, the function will return.
 */
const enforceReadPermission = async (
  readUserId: string,
  currentUserId: string
) => {
  // A regular user should only access user information
  // about him/herself or a friend.

  // The user is accessing information of him/herself
  if (readUserId === currentUserId) {
    return;
  }

  const friendRelation = await Friend.findOne({ user: currentUserId });
  // The user has no friends
  if (!friendRelation) {
    throw new ForbiddenError();
  }

  // The user is not accessing information about a friend
  if (!friendRelation.friends.includes(readUserId)) {
    throw new ForbiddenError();
  }
};

router.get(
  "/data",
  async (req: Request, res: Response, next: NextFunction) => {
    req.params.userId = req.user!.id;
    next();
  },
  readUserInfo
);

router.get(
  "/:userId/data",
  [
    param("userId")
      .custom((userId: string) => mongoose.Types.ObjectId.isValid(userId))
      .withMessage("User ID must be a valid Object ID type."),
  ],
  validateRequest,
  async (req: Request, res: Response, next: NextFunction) => {
    const { userId } = req.params;
    const currentUserId = req.user!.id;

    await enforceReadPermission(userId, currentUserId);

    next();
  },
  readUserInfo
);

router.get(
  "/avatar",
  async (req: Request, res: Response, next: NextFunction) => {
    req.params.userId = req.user!.id;
    next();
  },
  readUserAvatar
);

router.get(
  "/:userId/avatar",
  [
    param("userId")
      .custom((userId: string) => mongoose.Types.ObjectId.isValid(userId))
      .withMessage("User ID must be a valid Object ID type."),
  ],
  validateRequest,
  async (req: Request, res: Response, next: NextFunction) => {
    const { userId } = req.params;
    const currentUserId = req.user!.id;

    await enforceReadPermission(userId, currentUserId);

    next();
  },
  readUserAvatar
);

export { router as readRouter };
