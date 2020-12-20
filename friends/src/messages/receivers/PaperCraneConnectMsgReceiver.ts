/*
 * Created by Jimmy Lan
 * Creation Date: 2020-12-07
 */

import {
  MsgReceiver,
  Subjects,
  PaperCraneUserConnect,
} from "@ly-letitfly/common";
import { queueGroup } from "./constants";
import { Message } from "node-nats-streaming";
import { Friend, User } from "../../models";
import { FriendCreateMsgSender } from "../senders";

export class PaperCraneConnectMsgReceiver extends MsgReceiver<PaperCraneUserConnect> {
  subject: Subjects.PaperCraneUserConnect = Subjects.PaperCraneUserConnect;
  queueGroup = queueGroup;

  async onMessage(data: PaperCraneUserConnect["data"], msg: Message) {
    const {
      users: [userId1, userId2],
    } = data;

    console.log(
      `User connect message received - user1: ${userId1}, user2: ${userId2}.`
    );

    // TODO We don't need to await for both operations one by one here.
    //  To improve performance in the future, await for both promises
    //  and allow them to be processed at the same time.
    const user1 = await User.findById(userId1);
    const user2 = await User.findById(userId2);

    if (!user1) {
      throw new Error(`User ${userId1} is not found!`);
    }

    if (!user2) {
      throw new Error(`User ${userId2} is not found!`);
    }

    const userRelation1 = await Friend.findOne({ user: user1.id! });
    const userRelation2 = await Friend.findOne({ user: user2.id! });

    if (!userRelation1 || !userRelation2) {
      throw new Error("User relation for corresponding users not found!");
    }

    if (!userRelation1.friends.includes(user2)) {
      userRelation1.friends.push(user2);
      await userRelation1.save();

      await new FriendCreateMsgSender(this.client).send({
        userId: userId1,
        friendId: userId2,
        __v: userRelation1.__v,
      });
    }

    if (!userRelation2.friends.includes(user1)) {
      userRelation2.friends.push(user1);
      await userRelation2.save();

      await new FriendCreateMsgSender(this.client).send({
        userId: userId2,
        friendId: userId1,
        __v: userRelation2.__v,
      });
    }

    msg.ack();
  }
}
