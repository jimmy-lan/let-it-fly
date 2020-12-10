/*
 * Created by Jimmy Lan
 * Creation Date: 2020-12-08
 */

import express, { Request, Response } from "express";
import { query, param, body } from "express-validator";
import {
  BadRequestError,
  extractUser,
  requireAdmin,
  UserRole,
  validateRequest,
} from "@ly-letitfly/common";
import { User } from "../models";
import mongoose from "mongoose";

const router = express.Router();

/**
 * Get a list of all users
 */
router.get(
  "/",
  extractUser,
  requireAdmin,
  [
    query("limit").optional().isInt({ gt: 0 }),
    query("skip").optional().isInt({ gt: 0 }),
  ],
  validateRequest,
  async (req: Request, res: Response) => {
    const { skip, limit } = req.query;

    const findLimit: number = limit ? Number(limit) : 0;
    const findSkip: number = skip ? Number(skip) : 0;

    // Query users
    const users = await User.find({}).limit(findLimit).skip(findSkip).exec();

    return res.send({ success: true, data: users });
  }
);

/**
 * Update role for a specific user
 */
router.patch(
  "/roles/:userId/change",
  extractUser,
  requireAdmin,
  [
    param("userId").custom((id: string) => mongoose.Types.ObjectId.isValid(id)),
    body("role")
      .isIn(Object.values(UserRole))
      .withMessage("role must be valid"),
  ],
  validateRequest,
  async (req: Request, res: Response) => {
    const { role } = req.body;
    const { userId } = req.params;

    const user = await User.findById(userId);

    if (!user) {
      throw new BadRequestError(`User ${userId} does not exist`);
    }

    user.role = role;
    await user.save();

    return res.send({ success: true, data: user });
  }
);

export { router as adminRouter };
