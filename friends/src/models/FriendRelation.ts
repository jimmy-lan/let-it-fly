/*
 * Created by Jimmy Lan
 * Creation Date: 2020-12-05
 * Description:
 *     Friend relation document describing friend relationships
 *     between users. Model using a one-to-many relationship.
 */
import mongoose, { Schema, Document, Model } from "mongoose";
import { UserDocument } from "./User";

interface FriendRelationProps {
  user: UserDocument;
  friends: UserDocument[];
}

interface FriendRelationDocument extends Document {
  user: UserDocument;
  friends: UserDocument[];
}

interface FriendRelationModel extends Model<FriendRelationDocument> {
  build(props: FriendRelationProps): FriendRelationDocument;
}

const friendRelationSchema = new Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
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

const build = (props: FriendRelationProps) => {
  return new FriendRelation(props);
};
friendRelationSchema.static("build", build);

const FriendRelation = mongoose.model<
  FriendRelationDocument,
  FriendRelationModel
>("FriendRelation", friendRelationSchema);

export { FriendRelation };
