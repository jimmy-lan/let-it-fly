/*
 * Created by Jimmy Lan
 * Creation Date: 2020-12-05
 * Description:
 *     Friend document describing friend relationships between
 *     users. Model using a one-to-many relationship.
 */
import mongoose, { Schema, Document, Model } from "mongoose";
import { UserDocument } from "./User";

interface FriendProps {
  user: UserDocument;
  friends: UserDocument[];
}

interface FriendDocument extends Document {
  __v: number;
  user: UserDocument;
  friends: UserDocument[];
}

interface FriendModel extends Model<FriendDocument> {
  build(props: FriendProps): FriendDocument;
}

const friendSchema = new Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
      unique: true,
    },
    friends: {
      type: [mongoose.Schema.Types.ObjectId],
      ref: "User",
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

const build = (props: FriendProps) => {
  return new Friend(props);
};
friendSchema.static("build", build);

const Friend = mongoose.model<FriendDocument, FriendModel>(
  "Friend",
  friendSchema
);

export { Friend };
