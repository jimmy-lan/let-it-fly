/*
 * Created by Jimmy Lan
 * Creation Date: 2020-12-04
 * Description: The friends service needs to keep track of
 *   a list of paper crane transactions so that it can
 *   send a friend request based on the paper crane transaction
 *   id.
 */

import mongoose, { Schema, Document, Model } from "mongoose";
import { UserDocument } from "./User";

interface PaperCraneProps {
  id: string;
  sender: UserDocument;
  receiver: UserDocument;
}

export interface PaperCraneDocument extends Document {
  sender: UserDocument;
  receiver: UserDocument;
}

interface PaperCraneModel extends Model<PaperCraneDocument> {
  build(props: PaperCraneProps): PaperCraneDocument;
}

const paperCraneSchema = new Schema(
  {
    sender: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    receiver: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
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

const build = (props: PaperCraneProps) => {
  const paperCrane = { _id: props.id, ...props };
  delete paperCrane.id;
  return new PaperCrane(paperCrane);
};
paperCraneSchema.static("build", build);

const PaperCrane = mongoose.model<PaperCraneDocument, PaperCraneModel>(
  "PaperCrane"
);

export { PaperCrane };
