/*
 * Created by Jimmy Lan
 * Creation Date: 2020-12-03
 */

import { MsgReceiver } from "@ly-letitfly/common/build/models/MsgReceiver";
import { AccountSignUp, Subjects } from "@ly-letitfly/common/build/messages";
import { Message } from "node-nats-streaming";
import { queueGroup } from "./constants";
import { User } from "../../models";

export class AccountSignUpMsgReceiver extends MsgReceiver<AccountSignUp> {
  subject: Subjects.AccountSignUp = Subjects.AccountSignUp;
  queueGroup = queueGroup;

  async onMessage(data: AccountSignUp["data"], msg: Message) {
    const { id, email } = data;

    const user = User.build({
      _id: id,
      contact: { email: { primary: email } },
    });

    await user.save();

    msg.ack();
  }
}
