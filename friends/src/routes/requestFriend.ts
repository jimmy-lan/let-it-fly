/*
 * Created by Jimmy Lan
 * Creation Date: 2020-12-04
 */

import express, { Request, Response } from "express";
import { param } from "express-validator";
import mongoose from "mongoose";
import { validateRequest } from "@ly-letitfly/common";

const router = express.Router();

router.post(
  "/request/:paperCraneId",
  [
    param("paperCraneId").custom((userId: string) =>
      mongoose.Types.ObjectId.isValid(userId)
    ),
  ],
  validateRequest,
  async (req: Request, res: Response) => {
    const { paperCraneId } = req.params;
    return res.send({});
  }
);

export { router as requestFriendRouter };
