/*
 * Created by Jimmy Lan
 * Creation Date: 2020-12-05
 */

import mongoose, { Schema, Document, Model } from "mongoose";
import { defaultUserProperties } from "@ly-letitfly/common";

interface UserProps {
  id: string;
  coins?: number;
  paperCraneStyles?: string[];
}

interface UserDocument extends Document {
  id: string;
  coins: number;
  paperCraneStyles: string[];
}

interface UserModel extends Model<UserDocument> {
  build(props: UserProps): UserDocument;
}

const userSchema = new Schema(
  {
    coins: {
      type: Number,
      required: true,
      default: defaultUserProperties.coins,
    },
    paperCraneStyles: {
      type: [String],
      default: defaultUserProperties.paperCraneStyles,
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

const build = (props: UserProps) => {
  const user = { _id: props.id, ...props };
  delete user.id;
  return new User(user);
};
userSchema.static("build", build);

const User = mongoose.model<UserDocument, UserModel>("User", userSchema);
export { User };
