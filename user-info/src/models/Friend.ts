/*
 * Created by Jimmy Lan
 * Creation Date: 2020-12-05
 * Description:
 *     User information service needs to keep track of a list of friend ships
 *     in order to properly determine whether a user has permission to view another user's
 *     profile.
 */

import mongoose, { Schema, Document, Model } from "mongoose";
import { updateIfCurrentPlugin } from "mongoose-update-if-current";

interface FriendProps {
  user: string;
  friends?: string[];
}

interface FriendDocument extends Document {
  __v: number;
  user: string;
  friends: string[];
}

interface FriendModel extends Model<FriendDocument> {
  build(props: FriendProps): FriendDocument;
}

const friendSchema = new Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      unique: true,
    },
    friends: [mongoose.Schema.Types.ObjectId],
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
friendSchema.plugin(updateIfCurrentPlugin);

const build = (props: FriendProps) => {
  return new Friend(props);
};
friendSchema.static("build", build);

const Friend = mongoose.model<FriendDocument, FriendModel>(
  "Friend",
  friendSchema
);

export { Friend };
