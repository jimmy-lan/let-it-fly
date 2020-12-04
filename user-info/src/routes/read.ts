/*
 * Created by Jimmy Lan
 * Creation Date: 2020-12-04
 */

import express, { Request, Response, NextFunction } from "express";
import { param } from "express-validator";
import mongoose from "mongoose";
import { User } from "../models";
import { validateRequest } from "@ly-letitfly/common";
import { ForbiddenError } from "@ly-letitfly/common/build/errors/ForbiddenError";

const router = express.Router();

const readUserInfo = async (req: Request, res: Response) => {
  const { userId } = req.params;

  const user = await User.findById(userId);

  return res.send({ success: true, data: user });
};

router.get(
  "/",
  async (req: Request, res: Response, next: NextFunction) => {
    req.params.userId = req.user!.id;
    next();
  },
  readUserInfo
);

router.get(
  "/:userId",
  [
    param("userId")
      .custom((userId: string) => mongoose.Types.ObjectId.isValid(userId))
      .withMessage("User ID must be a valid Object ID type."),
  ],
  validateRequest,
  async (req: Request, res: Response, next: NextFunction) => {
    const { userId } = req.params;

    // TODO a regular user should be able to access user information of a
    //  friend. Update this once the friends service is complete.
    if (req.user!.id !== userId) {
      throw new ForbiddenError();
    }

    next();
  }
);

export { router as readInfoRouter };
