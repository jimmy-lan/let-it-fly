/*
 * Created by Jimmy Lan
 * Creation Date: 2020-12-07
 */

import express, { Request, Response } from "express";
import { param } from "express-validator";
import mongoose from "mongoose";
import { BadRequestError, validateRequest } from "@ly-letitfly/common";
import { Friend } from "../models";
import { FriendDeleteMsgSender } from "../messages/senders";
import { natsWrapper } from "../services";

const router = express.Router();

router.delete(
  "/:friendId",
  [
    param("friendId")
      .custom((userId: string) => mongoose.Types.ObjectId.isValid(userId))
      .withMessage("Friend ID must be a valid Object ID type."),
  ],
  validateRequest,
  async (req: Request, res: Response) => {
    const { friendId } = req.params;
    const friendRelation = await Friend.findOne({
      user: req.user!.id,
    });

    if (!friendRelation) {
      throw new BadRequestError(
        "Current user is not using the friends service. There is probably error with the event bus."
      );
    }

    if (!friendRelation.friends.includes(friendId)) {
      throw new BadRequestError(
        `User ${req.user!.id} does not have friend ${friendId}`
      );
    }

    const indexToDelete = friendRelation.friends.indexOf(friendId);
    friendRelation.friends.splice(indexToDelete, 1);
    await friendRelation.save();

    // Emit event
    await new FriendDeleteMsgSender(natsWrapper.client).send({
      userId: friendRelation.user,
      friendId: friendId,
      __v: friendRelation.__v,
    });

    return res.status(202).send({ success: true, data: friendId });
  }
);

export { router as deleteFriendRouter };
