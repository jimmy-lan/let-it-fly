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
import { DataWorker } from "../../services";

const sleep = (time: number) =>
  new Promise<void>((resolve) => {
    setTimeout(() => resolve(), time);
  });

export class AccountSignUpMsgReceiver extends MsgReceiver<AccountSignUp> {
  subject: Subjects.AccountSignUp = Subjects.AccountSignUp;
  queueGroup = queueGroup;

  async onMessage(data: AccountSignUp["data"], msg: Message) {
    const { id } = data;

    console.log(`Account sign up message received - id: ${id}`);

    if (!DataWorker.hasCompleted) {
      console.log(`Awaiting data worker to complete populate process.`);
      while (!DataWorker.hasCompleted) {
        await sleep(1000);
      }
    }

    const defaultPaperCraneItem = await StoreItem.findOne({
      category: StoreItemCategory.paperCraneStyle,
      value: defaultUserProperties.paperCraneStyleItems[0].value,
    });
    if (!defaultPaperCraneItem) {
      throw new Error(
        "Default item not found. Data worker may have a problem."
      );
    }

    const user = UserProperty.build({
      id,
      paperCraneStyles: [defaultPaperCraneItem],
    });

    try {
      await user.save();
    } catch (error) {
      console.error(error);
    }

    msg.ack();
  }
}
