/*
 * Created by Jimmy Lan
 * Creation Date: 2020-12-05
 */

import { StoreItemCategory } from "../enums";

export interface PaperCraneStyleItem {
  name: string;
  category: StoreItemCategory;
  description: string;
  price: number;
  value: string;
}

export const defaultUserProperties: {
  paperCraneStyleItems: PaperCraneStyleItem[];
  coins: number;
} = {
  paperCraneStyleItems: [
    {
      name: "Default Style",
      category: StoreItemCategory.paperCraneStyle,
      description: "Default paper crane style.",
      price: 0,
      value: "#bdbdbd",
    },
  ],
  coins: 1000,
};
