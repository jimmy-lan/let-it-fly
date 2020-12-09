/*
 * Created by Jimmy Lan
 * Creation Date: 2020-12-05
 */

import mongoose, { Schema, Document, Model } from "mongoose";
import { ReplyDocument } from "./Reply";
import { defaultUserProperties } from "@ly-letitfly/common";

interface PaperCraneProps {
  senderId: string;
  receiverId?: string;
  title: string;
  content: string;
  style: string;
  replies?: ReplyDocument[];
  wishToConnect?: string[];
}

export interface PaperCraneDocument extends Document {
  senderId: string;
  receiverId: string;
  title: string;
  content: string;
  style: string;
  replies: ReplyDocument[];
  wishToConnect: string[];
}

interface PaperCraneModel extends Model<PaperCraneDocument> {
  build(Props: PaperCraneProps): PaperCraneDocument;
}

const paperCraneSchema = new Schema(
  {
    senderId: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
    },
    receiverId: mongoose.Schema.Types.ObjectId,
    title: {
      type: String,
      required: true,
    },
    content: {
      type: String,
      required: true,
    },
    style: {
      type: String,
      required: true,
      default: defaultUserProperties.paperCraneStyleItems[0].value,
    },
    replies: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Reply",
      },
    ],
    wishToConnect: {
      type: [mongoose.Schema.Types.ObjectId],
      default: [],
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
  return new PaperCrane(props);
};
paperCraneSchema.static("build", build);

const PaperCrane = mongoose.model<PaperCraneDocument, PaperCraneModel>(
  "PaperCrane",
  paperCraneSchema
);

export { PaperCrane };
