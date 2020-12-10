/*
 * Created by Jimmy Lan
 * Creation Date: 2020-12-07
 */

import express, { Request, Response, NextFunction } from "express";
import { PaperCrane, PaperCraneRecord } from "../models";
import { UserRole } from "@ly-letitfly/common";

const router = express.Router();

router.get("/", async (req: Request, res: Response, next: NextFunction) => {
  // Temporary forwarding if the user is admin
  if (req.user!.role === UserRole.admin) {
    return next();
  }

  const userId = req.user!.id;

  // Find a random matching paper crane
  const findCondition = {
    // Sender is not current user
    senderId: { $ne: userId },
    // No receiver specified
    receiverId: { $exists: false },
  };
  const count = await PaperCrane.countDocuments(findCondition).exec();

  const skip = Math.floor(Math.random() * count);
  const paperCrane = await PaperCrane.findOne(findCondition).skip(skip).exec();

  // If fail to find any matching paper crane,
  // return unsuccessful message
  if (!paperCrane) {
    return res.send({
      success: false,
      errors: [
        "Unfortunately, we don't have any matching paper cranes for you right now.",
      ],
    });
  }

  // Assign the current user as recipient of this paper crane
  paperCrane.receiverId = userId;
  await paperCrane.save();

  // Add user record for the current user
  const record = PaperCraneRecord.build({ userId, paperCrane, isUnread: true });
  await record.save();

  // Send a successful response
  return res.send({
    success: true,
    data: { id: paperCrane.id, style: paperCrane.style },
  });
});

export { router as searchRouter };
