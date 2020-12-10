/*
 * Created by Jimmy Lan
 * Creation Date: 2020-12-06
 */

import { Message } from "../Message";
import { Subjects } from "../Subjects";
import { StoreItemCategory } from "../../enums";

export interface PropertyPurchase extends Message {
  subject: Subjects.PropertyPurchase;
  data: {
    userId: string;
    itemCategory: StoreItemCategory;
    itemValue: string;
    __v: number;
  };
}
