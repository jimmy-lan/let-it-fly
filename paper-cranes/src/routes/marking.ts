/*
 * Created by Jimmy Lan
 * Creation Date: 2020-12-07
 */

import express, { Request, Response } from "express";
import { body, param } from "express-validator";
import mongoose from "mongoose";
import { validateRequest } from "@ly-letitfly/common";
import { findPaperCraneAndRecord } from "./helpers";

const router = express.Router();

router.patch(
  "/:paperCraneId/marking",
  [
    param("paperCraneId")
      .custom((id: string) => mongoose.Types.ObjectId.isValid(id))
      .withMessage("Paper crane id must be valid"),
    body("isStarred").optional().isBoolean(),
    body("isUnread").optional().isBoolean(),
  ],
  validateRequest,
  async (req: Request, res: Response) => {
    const { isStarred, isUnread } = req.body;
    const { paperCraneId } = req.params;
    const userId = req.user!.id;

    // Find paper crane record for this user
    const [paperCrane, record] = await findPaperCraneAndRecord(
      userId,
      paperCraneId
    );

    // Update record
    if (isStarred !== undefined) {
      record.isStarred = isStarred;
    }
    if (isUnread !== undefined) {
      record.isUnread = isUnread;
    }
    await record.save();

    return res.send({
      success: true,
      data: {
        id: paperCrane.id,
        isStarred: record.isStarred,
        isUnread: record.isUnread,
      },
    });
  }
);

export { router as markingRouter };
