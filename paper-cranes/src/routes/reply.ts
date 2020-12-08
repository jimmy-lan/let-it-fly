/*
 * Created by Jimmy Lan
 * Creation Date: 2020-12-07
 */

import express, { Request, Response } from "express";
import { param, body } from "express-validator";
import mongoose from "mongoose";
import { validateRequest } from "@ly-letitfly/common";
import { findActiveUser, findPaperCraneAndRecord } from "./helpers";
import { Reply } from "../models";
import { PaperCraneConnectMsgSender } from "../messages/senders";
import { natsWrapper } from "../services";

const router = express.Router();

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

    const user = await findActiveUser(userId);

    const [paperCrane] = await findPaperCraneAndRecord(userId, paperCraneId);

    const reply = Reply.build({ sender: user, content, isWishToConnect });
    await reply.save();

    paperCrane.replies.push(reply);
    await paperCrane.save();

    if (isWishToConnect && !paperCrane.wishToConnect.includes(userId)) {
      paperCrane.wishToConnect.push(userId);
      await paperCrane.save();
      if (paperCrane.wishToConnect.length === 2) {
        await new PaperCraneConnectMsgSender(natsWrapper.client).send({
          users: paperCrane.wishToConnect,
        });
      }
    }

    return res.status(201).send({ success: true, data: reply });
  }
);

export { router as replyRouter };
