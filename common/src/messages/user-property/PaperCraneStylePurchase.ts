/*
 * Created by Jimmy Lan
 * Creation Date: 2020-12-06
 */

import { Message } from "../Message";
import { Subjects } from "../Subjects";
import { PaperCraneStyle, StoreItemCategory } from "../../enums";

export interface PaperCraneStylePurchase extends Message {
  subject: Subjects.PropertyPurchase;
  data: {
    userId: string;
    itemValue: PaperCraneStyle;
  };
}
