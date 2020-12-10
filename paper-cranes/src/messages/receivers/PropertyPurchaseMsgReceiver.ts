/*
 * Created by Jimmy Lan
 * Creation Date: 2020-12-07
 */

import {
  MsgReceiver,
  PropertyPurchase,
  StoreItemCategory,
  Subjects,
} from "@ly-letitfly/common";
import { queueGroup } from "./constants";
import { UserProperty } from "../../models";
import { Message } from "node-nats-streaming";

export class PropertyPurchaseMsgReceiver extends MsgReceiver<PropertyPurchase> {
  subject: PropertyPurchase["subject"] = Subjects.PropertyPurchase;
  queueGroup = queueGroup;

  async onMessage(data: PropertyPurchase["data"], msg: Message) {
    const property = await UserProperty.findOne({
      _id: data.userId,
      __v: data.__v - 1,
    });

    if (!property) {
      throw new Error(
        "No matching property entry found. " +
          `data.userId: ${data.userId}, data.__v: ${data.__v}`
      );
    }

    const { itemCategory, itemValue } = data;

    console.log(
      `Property purchase event received - category: ${itemCategory}, value: ${itemValue}`
    );

    if (itemCategory === StoreItemCategory.paperCraneStyle) {
      // In this case, <itemValue> refers to the colour of the paper crane
      if (!property.paperCraneStyles.includes(itemValue)) {
        property.paperCraneStyles.push(itemValue);
      }
    }
    // Have to save even if no update is made bc we need to keep an accurate
    // count on __v
    await property.save();

    msg.ack();
  }
}
