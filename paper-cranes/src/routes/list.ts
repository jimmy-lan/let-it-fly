/*
 * Created by Jimmy Lan
 * Creation Date: 2020-12-07
 */

import express, { Request, Response } from "express";
import { PaperCraneRecord, PaperCraneRecordDocument } from "../models";

const router = express.Router();

const mapRecordsToPaperCrane = (record: PaperCraneRecordDocument) => {
  const {
    isUnread,
    isStarred,
    paperCrane: { id, title, style },
  } = record;
  return {
    id,
    title,
    style,
    isUnread,
    isStarred,
  };
};

router.get("/sent", async (req: Request, res: Response) => {
  const userId = req.user!.id;

  // Query paper crane record
  const paperCraneRecords = await PaperCraneRecord.find({ userId }).populate({
    path: "paperCrane",
    select: "title content style senderId",
  });

  const filteredRecords = paperCraneRecords
    .filter(
      (record) =>
        record.paperCrane.senderId.toString() === userId && !record.isDeleted
    )
    .map(mapRecordsToPaperCrane);

  return res.send({ success: true, data: filteredRecords });
});

router.get("/received", async (req: Request, res: Response) => {
  const userId = req.user!.id;

  // Query paper crane record
  const paperCraneRecords = await PaperCraneRecord.find({ userId }).populate({
    path: "paperCrane",
    select: "title content style receiverId",
  });

  const filteredRecords = paperCraneRecords
    .filter(
      (record) =>
        record.paperCrane.receiverId?.toString() === userId && !record.isDeleted
    )
    .map(mapRecordsToPaperCrane);
  return res.send({ success: true, data: filteredRecords });
});

router.get("/starred", async (req: Request, res: Response) => {
  const userId = req.user!.id;

  // Query paper crane record
  const paperCraneRecords = await PaperCraneRecord.find({ userId }).populate({
    path: "paperCrane",
    select: "title content style",
  });
  const filteredRecords = paperCraneRecords
    .filter((record) => record.isStarred && !record.isDeleted)
    .map(mapRecordsToPaperCrane);
  return res.send({ success: true, data: filteredRecords });
});

router.get("/unread", async (req: Request, res: Response) => {
  const userId = req.user!.id;

  // Query paper crane record
  const paperCraneRecords = await PaperCraneRecord.find({ userId }).populate({
    path: "paperCrane",
    select: "title content style",
  });

  const filteredRecords = paperCraneRecords
    .filter((record) => record.isUnread && !record.isDeleted)
    .map(mapRecordsToPaperCrane);
  return res.send({ success: true, data: filteredRecords });
});

export { router as listRouter };
