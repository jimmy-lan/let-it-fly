/*
 * Created by Jimmy Lan
 * Creation Date: 2020-12-08
 */

import { MsgSender, PropertyPurchase, Subjects } from "@ly-letitfly/common";

export class propertyPurchaseMsgSender extends MsgSender<PropertyPurchase> {
  subject: PropertyPurchase["subject"] = Subjects.PropertyPurchase;
}
