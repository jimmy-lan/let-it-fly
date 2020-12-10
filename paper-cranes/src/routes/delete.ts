/*
 * Created by Jimmy Lan
 * Creation Date: 2020-12-07
 */

import express, { Request, Response } from "express";
import { param } from "express-validator";
import mongoose from "mongoose";
import { BadRequestError, validateRequest } from "@ly-letitfly/common";
import { PaperCraneRecord } from "../models";

const router = express.Router();

router.delete(
  "/:paperCraneId/delete",
  [
    param("paperCraneId")
      .custom((id: string) => mongoose.Types.ObjectId.isValid(id))
      .withMessage("Id must be valid."),
  ],
  validateRequest,
  async (req: Request, res: Response) => {
    const { paperCraneId } = req.params;
    const userId = req.user!.id;

    // Make sure the current user can delete this paper crane
    const paperCraneRecord = await PaperCraneRecord.findOne({
      userId,
    }).populate({ path: "paperCrane", select: "id" });
    if (!paperCraneRecord) {
      // User does not have any paper crane
      throw new BadRequestError(
        `Cannot delete paper crane with id value ${paperCraneId}`
      );
    }

    // Soft delete
    paperCraneRecord.isDeleted = true;
    await paperCraneRecord.save();

    return res
      .status(202)
      .send({ success: true, data: paperCraneRecord.paperCrane.id });
  }
);

export { router as deleteRouter };
