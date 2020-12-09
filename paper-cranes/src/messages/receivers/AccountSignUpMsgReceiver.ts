/*
 * Created by Jimmy Lan
 * Creation Date: 2020-12-06
 */

import { Message } from "node-nats-streaming";
import { AccountSignUp, MsgReceiver, Subjects } from "@ly-letitfly/common";
import { queueGroup } from "./constants";
import { User, UserProperty } from "../../models";

export class AccountSignUpMsgReceiver extends MsgReceiver<AccountSignUp> {
  subject: Subjects.AccountSignUp = Subjects.AccountSignUp;
  queueGroup = queueGroup;

  async onMessage(data: AccountSignUp["data"], msg: Message) {
    const { id } = data;

    console.log(`Account sign up message received - id: ${id}`);

    const user = User.build({
      id,
    });

    try {
      await user.save();
    } catch (error) {
      console.error(error);
      // Acknowledge because this error is most likely caused by
      // concurrency
      msg.ack();
      return;
    }

    const property = UserProperty.build({ id });
    await property.save();

    msg.ack();
  }
}
