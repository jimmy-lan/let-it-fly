/*
 * Created by Jimmy Lan
 * Creation Date: 2020-12-08
 */

import {
  AccountRoleUpdateUser,
  MsgReceiver,
  Subjects,
} from "@ly-letitfly/common";
import { queueGroup } from "./constants";
import { Message } from "node-nats-streaming";
import { User } from "../../models";
import { UserInfoUpdateMsgSender } from "../senders";

export class AccountRoleUpdateUserMsgReceiver extends MsgReceiver<AccountRoleUpdateUser> {
  subject: AccountRoleUpdateUser["subject"] = Subjects.AccountUserRoleUpdate;
  queueGroup = queueGroup;

  async onMessage(data: AccountRoleUpdateUser["data"], msg: Message) {
    const { firstName, lastName, id } = data;

    console.log(
      `User role upgrade message received - id: ${id}, first name: ${firstName}, last name: ${lastName}`
    );

    const user = await User.findById(id);

    if (!user) {
      throw new Error(
        `User with id ${id} does not exist. A message may be missing.`
      );
    }

    user.personal.name.first = firstName;
    user.personal.name.last = lastName;
    await user.save();

    // Emit user info change message
    await new UserInfoUpdateMsgSender(this.client).send({
      firstName: user.personal.name.first,
      lastName: user.personal.name.last,
      avatar: user.avatar,
      id: user.id!,
      __v: user.__v,
    });

    msg.ack();
  }
}
