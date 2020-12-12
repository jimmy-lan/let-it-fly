/*
 * Created by Jimmy Lan
 * Creation Date: 2020-12-03
 */

import { AccountSignUp, Subjects, MsgReceiver } from "@ly-letitfly/common";
import { Message } from "node-nats-streaming";
import { queueGroup } from "./constants";
import { Friend, User } from "../../models";

export class AccountSignUpMsgReceiver extends MsgReceiver<AccountSignUp> {
  subject: Subjects.AccountSignUp = Subjects.AccountSignUp;
  queueGroup = queueGroup;

  async onMessage(data: AccountSignUp["data"], msg: Message) {
    const { id, email } = data;

    console.log(
      `Account sign up message received - id: ${id}, email: ${email}`
    );

    const user = User.build({
      id,
      contact: { email: { primary: email } },
    });

    try {
      await user.save();
    } catch (error) {
      console.error(error);
      msg.ack();
      return;
    }

    const friendRelation = Friend.build({ user: user.id!, friends: [] });
    await friendRelation.save();

    msg.ack();
  }
}
