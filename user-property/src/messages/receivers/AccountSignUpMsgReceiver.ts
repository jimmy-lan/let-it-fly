/*
 * Created by Jimmy Lan
 * Creation Date: 2020-12-06
 */

import { Message } from "node-nats-streaming";
import {
  AccountSignUp,
  defaultUserProperties,
  MsgReceiver,
  StoreItemCategory,
  Subjects,
} from "@ly-letitfly/common";
import { queueGroup } from "./constants";
import { StoreItem, UserProperty } from "../../models";

export class AccountSignUpMsgReceiver extends MsgReceiver<AccountSignUp> {
  subject: Subjects.AccountSignUp = Subjects.AccountSignUp;
  queueGroup = queueGroup;

  async onMessage(data: AccountSignUp["data"], msg: Message) {
    const { id } = data;

    console.log(`Account sign up message received - id: ${id}`);

    const defaultPaperCraneItem = await StoreItem.findOne({
      category: StoreItemCategory.paperCraneStyle,
      value: defaultUserProperties.paperCraneStyleItems[0].value,
    });
    if (!defaultPaperCraneItem) {
      throw new Error(
        "Default item not found. Awaiting for data worker to populate."
      );
    }

    const user = UserProperty.build({
      id,
      paperCraneStyles: [defaultPaperCraneItem.id],
    });

    try {
      await user.save();
    } catch (error) {
      console.error(error);
    }

    msg.ack();
  }
}
