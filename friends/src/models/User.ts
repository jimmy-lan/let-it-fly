/*
 * Created by Jimmy Lan
 * Creation Date: 2020-12-04
 */

import mongoose, { Schema, Document, Model } from "mongoose";

interface UserProps {
  id: string;
  firstName: string;
  lastName: string;
  avatar: string;
}

export interface UserDocument extends Document {
  firstName: string;
  lastName: string;
  avatar: string;
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
    avatar: String,
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
  return new User(props);
};
userSchema.static("build", build);

const User = mongoose.model<UserDocument, UserModel>("User", userSchema);

export { User };
