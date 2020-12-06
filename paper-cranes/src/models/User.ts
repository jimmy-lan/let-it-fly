/*
 * Created by Jimmy Lan
 * Creation Date: 2020-12-05
 */

import mongoose, { Schema, Document, Model } from "mongoose";
import { defaultUserProperties, PaperCraneStyle } from "@ly-letitfly/common";

interface UserProps {
  id: string;
  firstName: string;
  lastName: string;
  paperCraneStyles: PaperCraneStyle[];
}

export interface UserDocument extends Document {
  firstName: string;
  lastName: string;
  paperCraneStyles: PaperCraneStyle[];
}

interface UserModel extends Model<UserDocument> {
  build(props: UserProps): UserDocument;
}

const userSchema = new Schema(
  {
    firstName: {
      type: String,
      required: true,
    },
    lastName: {
      type: String,
      required: true,
    },
    paperCraneStyles: {
      type: [String],
      required: true,
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
