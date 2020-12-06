/*
 * Created by Jimmy Lan
 * Creation Date: 2020-12-05
 */

import mongoose, { Schema, Document, Model } from "mongoose";
import { defaultUserProperties } from "@ly-letitfly/common";

import { PaperCraneStyle } from "../../../common/src/enums";

interface UserProps {
  id: string;
  coins?: number;
  paperCraneStyles?: PaperCraneStyle[];
}

interface UserDocument extends Document {
  id: string;
  coins: number;
  paperCraneStyles: PaperCraneStyle[];
}

interface UserModel extends Model<UserDocument> {
  build(props: UserProps): UserDocument;
}

const userSchema = new Schema(
  {
    coins: {
      type: Number,
      required: true,
    },
    paperCraneStyles: {
      type: [String],
      enum: Object.values(PaperCraneStyle),
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
  return new User(props);
};
userSchema.static("build", build);

const User = mongoose.model<UserDocument, UserModel>("User", userSchema);
export { User };
