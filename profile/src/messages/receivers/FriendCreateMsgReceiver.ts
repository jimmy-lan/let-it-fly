/*
 * Created by Jimmy Lan
 * Creation Date: 2020-12-07
 */

import { FriendCreate, MsgReceiver, Subjects } from "@ly-letitfly/common";
import { queueGroup } from "./constants";
import { Message } from "node-nats-streaming";
import { Friend } from "../../models";

export class FriendCreateMsgReceiver extends MsgReceiver<FriendCreate> {
  subject: Subjects.FriendCreate = Subjects.FriendCreate;
  queueGroup = queueGroup;

  async onMessage(data: FriendCreate["data"], msg: Message) {
    const friendRelation = await Friend.findOne({
      user: data.userId,
      __v: data.__v - 1,
    });

    console.log(
      `Friend create message received - user id: ${data.userId}, friend id: ${data.friendId}`
    );

    if (!friendRelation) {
      throw new Error("No matching friend entry found!");
    }

    const { friendId } = data;

    if (!friendRelation.friends.includes(friendId)) {
      friendRelation.friends.push(friendId);
    }

    await friendRelation.save();

    msg.ack();
  }
}
