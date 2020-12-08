/*
 * Created by Jimmy Lan
 * Creation Date: 2020-12-05
 */

import mongoose, { Schema, Document, Model } from "mongoose";
import { PaperCraneDocument } from "./PaperCrane";

interface PaperCraneRecordProps {
  userId: string;
  paperCrane: PaperCraneDocument;
  isDeleted?: boolean;
  isStarred?: boolean;
  isUnread?: boolean;
}

export interface PaperCraneRecordDocument extends Document {
  userId: string;
  paperCrane: PaperCraneDocument;
  isDeleted: boolean;
  isStarred: boolean;
  isUnread: boolean;
}

interface PaperCraneRecordModel extends Model<PaperCraneRecordDocument> {
  build(props: PaperCraneRecordProps): PaperCraneRecordDocument;
}

const paperCraneRecordSchema = new Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
    },
    paperCrane: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: "PaperCrane",
    },
    isDeleted: Boolean,
    isStarred: Boolean,
    isUnread: Boolean,
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

const build = (props: PaperCraneRecordProps) => {
  return new PaperCraneRecord(props);
};
paperCraneRecordSchema.static("build", build);

const PaperCraneRecord = mongoose.model<
  PaperCraneRecordDocument,
  PaperCraneRecordModel
>("PaperCraneRecord", paperCraneRecordSchema);

export { PaperCraneRecord };
