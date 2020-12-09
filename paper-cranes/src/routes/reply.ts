/*
 * Created by Jimmy Lan
 * Creation Date: 2020-12-07
 */

import express, { Request, Response } from "express";
import { param, body } from "express-validator";
import mongoose from "mongoose";
import { BadRequestError, validateRequest } from "@ly-letitfly/common";
import { findActiveUser } from "./helpers";
import {
  PaperCrane,
  PaperCraneDocument,
  PaperCraneRecord,
  Reply,
} from "../models";
import { PaperCraneConnectMsgSender } from "../messages/senders";
import { natsWrapper } from "../services";

const router = express.Router();

const markUnreadForReplyReceiver = async (
  paperCrane: PaperCraneDocument,
  senderId: string
) => {
  const replyReceiverId =
    senderId === paperCrane.senderId
      ? paperCrane.receiverId
      : paperCrane.senderId;

  // Mark paper crane as unread for receiver of this paper crane reply
  const replyReceiverRecord = await PaperCraneRecord.findOne({
    userId: replyReceiverId,
    paperCrane,
  });
  if (!replyReceiverRecord) {
    throw new Error(
      "Paper crane specifies a receiver, but paper crane record " +
        "does not reflect this. Please inspect paper crane id " +
        paperCrane.id
    );
  }
  replyReceiverRecord.isUnread = true;
  await replyReceiverRecord.save();
};

router.post(
  "/:paperCraneId/reply",
  [
    param("paperCraneId").custom((id: string) =>
      mongoose.Types.ObjectId.isValid(id)
    ),
    body("content").isString().notEmpty(),
    body("isWishToConnect").optional().isBoolean(),
  ],
  validateRequest,
  async (req: Request, res: Response) => {
    const { paperCraneId } = req.params;
    const { content, isWishToConnect } = req.body;
    const userId = req.user!.id;

    const currentUser = await findActiveUser(userId);

    const paperCrane = await PaperCrane.findById(paperCraneId);
    if (!paperCrane) {
      throw new BadRequestError(`Paper crane ${paperCraneId} does not exist`);
    }
    if (!paperCrane.receiverId) {
      throw new BadRequestError(
        `Cannot reply to paper crane ${paperCraneId} because ` +
          "no receiver is present."
      );
    }

    // Save reply
    const reply = Reply.build({
      sender: currentUser,
      content,
      isWishToConnect,
    });
    await reply.save();

    paperCrane.replies.push(reply);
    await paperCrane.save();

    // No need to await for this action because
    // the result from this is not important for
    // determining whether the request is successful
    markUnreadForReplyReceiver(paperCrane, req.user!.id).then(() => {
      console.log(
        `Marked paper crane ${paperCrane.id} as unread for user ${paperCrane.receiverId}`
      );
    });

    if (isWishToConnect && !paperCrane.wishToConnect.includes(userId)) {
      paperCrane.wishToConnect.push(userId);
      await paperCrane.save();
      if (paperCrane.wishToConnect.length === 2) {
        await new PaperCraneConnectMsgSender(natsWrapper.client).send({
          users: paperCrane.wishToConnect,
        });
      }
    }

    const data: any = reply.toJSON();
    delete data.sender;

    return res.status(201).send({ success: true, data });
  }
);

export { router as replyRouter };
