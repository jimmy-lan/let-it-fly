/*
 * Created by Jimmy Lan
 * Creation Date: 2020-12-07
 */

import express, { Request, Response } from "express";
import { param } from "express-validator";
import mongoose from "mongoose";
import { validateRequest } from "@ly-letitfly/common";
import { findPaperCraneAndRecord } from "./helpers";

const router = express.Router();

router.get(
  "/:paperCraneId/info",
  [
    param("paperCraneId").custom((id: string) =>
      mongoose.Types.ObjectId.isValid(id)
    ),
  ],
  validateRequest,
  async (req: Request, res: Response) => {
    const { paperCraneId } = req.params;
    const userId = req.user!.id;

    // Query paper crane
    const [paperCrane, record] = await findPaperCraneAndRecord(
      userId,
      paperCraneId
    );

    // Construct response body
    const responseData: any = {
      id: paperCrane.id,
      title: paperCrane.title,
      content: paperCrane.content,
      style: paperCrane.style,
      isUnread: record.isUnread,
      isStarred: record.isStarred,
    };

    // Determine what to return for replies entry
    await paperCrane.populate("replies").execPopulate();

    let replies = [];

    for (let reply of paperCrane.replies) {
      const ret: any = {
        content: reply.content,
        isWishToConnect: reply.isWishToConnect,
      };
      await reply.populate("sender").execPopulate();

      if (paperCrane.wishToConnect.length === 2) {
        ret.sender = reply.sender;
      } else {
        if (reply.sender.id !== userId) {
          ret.sender = "Anonymous";
        } else {
          ret.sender = "You";
        }
      }
      replies.push(ret);
    }

    responseData.replies = replies;

    // Mark paper crane as read if needed
    if (record.isUnread) {
      record.isUnread = false;
      await record.save();
    }

    return res.send({ success: true, data: responseData });
  }
);

export { router as readRouter };
