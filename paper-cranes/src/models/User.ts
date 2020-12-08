/*
 * Created by Jimmy Lan
 * Creation Date: 2020-12-05
 */

import mongoose, { Schema, Document, Model } from "mongoose";
import { defaultUserProperties } from "@ly-letitfly/common";
import { updateIfCurrentPlugin } from "mongoose-update-if-current";

interface UserProps {
  id: string;
  firstName?: string;
  lastName?: string;
  paperCraneStyles?: string[];
}

export interface UserDocument extends Document {
  firstName: string;
  lastName: string;
  paperCraneStyles: string[];
}

interface UserModel extends Model<UserDocument> {
  build(props: UserProps): UserDocument;
}

const defaultUserPaperCraneStyles = defaultUserProperties.paperCraneStyleItems.map(
  (item) => item.value
);

const userSchema = new Schema(
  {
    firstName: String,
    lastName: String,
    paperCraneStyles: {
      type: [String],
      required: true,
      default: defaultUserPaperCraneStyles,
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
userSchema.plugin(updateIfCurrentPlugin);

const build = (props: UserProps) => {
  const user: any = { _id: props.id, ...props };
  delete user.id;
  return new User(user);
};
userSchema.static("build", build);

const User = mongoose.model<UserDocument, UserModel>("User", userSchema);

export { User };
