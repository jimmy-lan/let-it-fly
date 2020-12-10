/*
 * Created by Jimmy Lan
 * Creation Date: 2020-12-07
 */

import { MsgReceiver, Subjects, FriendDelete } from "@ly-letitfly/common";
import { queueGroup } from "./constants";
import { Message } from "node-nats-streaming";
import { Friend } from "../../models";

export class FriendDeleteMsgReceiver extends MsgReceiver<FriendDelete> {
  subject: Subjects.FriendDelete = Subjects.FriendDelete;
  queueGroup = queueGroup;

  async onMessage(data: FriendDelete["data"], msg: Message) {
    const friendRelation = await Friend.findOne({
      user: data.userId,
      __v: data.__v - 1,
    });

    console.log(
      `Friend create message received - user id: ${data.userId}, friend id: ${data.friendId}`
    );

    if (!friendRelation) {
      throw new Error("No matching friend relation found!");
    }

    const { friendId } = data;

    friendRelation.friends.filter((entry) => entry !== friendId);
    await friendRelation.save();

    msg.ack();
  }
}
