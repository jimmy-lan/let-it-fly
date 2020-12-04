/*
 * Created by Jimmy Lan
 * Creation Date: 2020-12-04
 */

import mongoose, { Schema, Document, Model } from "mongoose";
import { UserDocument } from "./User";
import { PaperCraneDocument } from "./PaperCrane";

interface FriendRequestProps {
  sender: UserDocument;
  paperCrane: PaperCraneDocument;
  /**
   * Message to be shown to the receiver of this request
   */
  message: string;
}

interface FriendRequestDocument extends Document {
  sender: UserDocument;
  paperCrane: PaperCraneDocument;
  message: string;
}

interface FriendRequestModel
  extends Model<FriendRequestDocument, FriendRequestModel> {
  build(props: FriendRequestProps): FriendRequestDocument;
}

const friendRequestSchema = new Schema(
  {
    sender: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    paperCrane: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "PaperCrane",
      required: true,
    },
    message: {
      type: String,
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
    },
  }
);

const build = (props: FriendRequestProps) => {
  return new FriendRequest(props);
};
friendRequestSchema.static("build", build);

const FriendRequest = mongoose.model<FriendRequestDocument, FriendRequestModel>(
  "FriendRequest"
);

export { FriendRequest };
