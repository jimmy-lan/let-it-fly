/*
 * Created by Jimmy Lan
 * Creation Date: 2020-12-05
 */

import mongoose, { Schema, Document, Model } from "mongoose";
import { StoreItemCategory } from "@ly-letitfly/common";
import { updateIfCurrentPlugin } from "mongoose-update-if-current";

interface StoreItemProps {
  name: string;
  category: StoreItemCategory;
  /**
   * Value required by the services working with this item.
   * Used internally on servers. Do not display to user.
   */
  value: string;
  description: string;
  price: number;
}

export interface StoreItemDocument extends Document {
  name: string;
  category: StoreItemCategory;
  value: string;
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
    value: {
      type: String,
      required: true,
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
storeItemSchema.plugin(updateIfCurrentPlugin);

const build = (props: StoreItemProps) => {
  return new StoreItem(props);
};
storeItemSchema.static("build", build);

const StoreItem = mongoose.model<StoreItemDocument, StoreItemModel>(
  "StoreItem",
  storeItemSchema
);
export { StoreItem };
