/*
 * Created by Jimmy Lan
 * Creation Date: 2020-12-05
 * Description:
 *     User information service needs to keep track of a list of friend relationships
 *     in order to properly determine whether a user has permission to view another user's
 *     profile.
 */

import mongoose, { Schema, Document, Model } from "mongoose";

interface FriendRelationProps {
  user: string;
  friends?: string[];
}

interface FriendRelationDocument extends Document {
  user: string;
  friends: string[];
}

interface FriendRelationModel extends Model<FriendRelationDocument> {
  build(props: FriendRelationProps): FriendRelationDocument;
}

const friendRelationSchema = new Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
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

const build = (props: FriendRelationProps) => {
  return new FriendRelation(props);
};
friendRelationSchema.static("build", build);

const FriendRelation = mongoose.model<
  FriendRelationDocument,
  FriendRelationModel
>("FriendRelation", friendRelationSchema);

export { FriendRelation };
