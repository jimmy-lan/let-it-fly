/*
 * Created by Jimmy Lan
 * Creation Date: 2020-12-07
 */

import express, { Request, Response } from "express";
import { PaperCraneRecord } from "../models";

const router = express.Router();

router.get("/sent", async (req: Request, res: Response) => {
  const userId = req.user!.id;

  // Query paper crane record
  const paperCraneRecords = await PaperCraneRecord.find({ userId }).populate({
    path: "paperCrane",
    select: "title content style senderId",
  });

  const filteredRecords = paperCraneRecords
    .filter((record) => record.paperCrane.senderId.toString() === userId)
    .map((record) => record.paperCrane);

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
    .filter((record) => record.paperCrane.receiverId.toString() === userId)
    .map((record) => record.paperCrane);
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
    .filter((record) => record.isStarred)
    .map((record) => record.paperCrane);
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
    .filter((record) => record.isUnread)
    .map((record) => record.paperCrane);
  return res.send({ success: true, data: filteredRecords });
});

export { router as listRouter };
