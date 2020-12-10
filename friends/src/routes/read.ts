/*
 * Created by Jimmy Lan
 * Creation Date: 2020-12-07
 */

import express, { Request, Response, NextFunction } from "express";
import { query, param } from "express-validator";
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
  const { limit, skip } = req.params;
  const { userId } = req.params;

  const findLimit: number = limit ? Number(limit) : 0;
  const findSkip: number = skip ? Number(skip) : 0;

  const friendRelation = await Friend.findOne({ user: userId })
    .limit(findLimit)
    .skip(findSkip)
    .populate("friends")
    .exec();

  if (!friendRelation) {
    throw new BadRequestError(
      `Friend relation for user with id ${userId} is not found`
    );
  }

  return res.send({ success: true, data: friendRelation.friends });
};

const paginationQueryHandler = [
  query("limit").optional().isInt({ gt: 0 }),
  query("skip").optional().isInt({ gt: 0 }),
];

router.get(
  "/",
  (req: Request, res: Response, next: NextFunction) => {
    // Add current user id as a params variable
    req.params.userId = req.user!.id;
    next();
  },
  paginationQueryHandler,
  validateRequest,
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

    // Perform permission checks
    if (req.user!.role !== UserRole.admin && req.user!.id !== userId) {
      throw new ForbiddenError();
    }

    next();
  },
  paginationQueryHandler,
  validateRequest,
  readFriends
);

export { router as readFriendsRouter };
