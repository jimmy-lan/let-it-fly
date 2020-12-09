/*
 * Created by Jimmy Lan
 * Creation Date: 2020-12-07
 */

import { MsgReceiver, Subjects, UserInfoUpdate } from "@ly-letitfly/common";
import { Message } from "node-nats-streaming";
import { queueGroup } from "./constants";
import { User } from "../../models";

export class UserInfoUpdateMsgReceiver extends MsgReceiver<UserInfoUpdate> {
  subject: Subjects.UserInfoUpdate = Subjects.UserInfoUpdate;
  queueGroup = queueGroup;

  async onMessage(data: UserInfoUpdate["data"], msg: Message) {
    const user = await User.findOne({
      _id: data.id,
      __v: data.__v - 1,
    });

    if (!user) {
      // We are attempting to update user information in an incorrect order
      throw new Error(
        "No matching user entry found." +
          `data.d: ${data.id}, data.__v: ${data.__v}`
      );
    }

    const { firstName, lastName } = data;

    console.log(
      `User info update message received - first name: ${firstName}, last name: ${lastName}`
    );

    user.set({ firstName, lastName });
    try {
      await user.save();
    } catch (error) {
      console.error(error);
    }

    msg.ack();
  }
}
