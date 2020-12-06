/*
 * Created by Jimmy Lan
 * Creation Date: 2020-12-05
 */

import mongoose, { Schema, Document, Model } from "mongoose";
import { StoreItemCategory } from "@ly-letitfly/common";

interface StoreItemProps {
  name: string;
  category: StoreItemCategory;
  description: string;
  price: number;
}

interface StoreItemDocument extends Document {
  name: string;
  category: StoreItemCategory;
  description: string;
  price: number;
}

interface StoreItemModel extends Model<StoreItemDocument> {
  build(props: StoreItemProps): StoreItemDocument;
}

const storeItemSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
    },
    category: {
      type: String,
      required: true,
      enum: Object.values(StoreItemCategory),
    },
    description: {
      type: String,
      required: true,
    },
    price: {
      type: Number,
      required: true,
    },
  },
  {
    toJSON: {
      transform(doc, ret) {
        ret.id = ret._id;
        delete ret._id;
        delete ret.__v;
      },
      versionKey: false,
    },
  }
);

const build = (props: StoreItemProps) => {
  return new StoreItem(props);
};
storeItemSchema.static("build", build);

const StoreItem = mongoose.model<StoreItemDocument, StoreItemModel>(
  "StoreItem",
  storeItemSchema
);
export { StoreItem };
