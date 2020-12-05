/*
 * Created by Jimmy Lan
 * Creation Date: 2020-12-05
 */

import mongoose, { Schema, Document, Model } from "mongoose";
import { UserDocument } from "./User";
import { PaperCraneStyle } from "../../../common/src/enums";
import { ReplyDocument } from "./Reply";

interface PaperCraneProps {
  sender: UserDocument;
  receiver?: UserDocument;
  title: string;
  content: string;
  style: PaperCraneStyle;
  replies?: ReplyDocument[];
  wishToConnect?: string[];
}

interface PaperCraneDocument extends Document {
  sender: UserDocument;
  receiver: UserDocument;
  title: string;
  content: string;
  style: PaperCraneStyle;
  replies: ReplyDocument[];
  wishToConnect: string[];
}

interface PaperCraneModel extends Model<PaperCraneDocument> {
  build(Props: PaperCraneProps): PaperCraneDocument;
}

const paperCraneSchema = new Schema(
  {
    sender: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: "User",
    },
    receiver: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
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
      enum: Object.values(PaperCraneStyle),
      default: PaperCraneStyle.gray,
    },
    replies: {
      type: [mongoose.Schema.Types.ObjectId],
      ref: "Reply",
    },
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
