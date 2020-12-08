/*
 * Created by Jimmy Lan
 * Creation Date: 2020-12-07
 */

import express, { Request, Response, NextFunction } from "express";
import mongoose from "mongoose";
import { PaperCraneRecord } from "../models";

const router = express.Router();

router.get("/sent", async (req: Request, res: Response) => {
  const userId = req.user!.id;

  // Query paper crane record
  const paperCraneRecords = await PaperCraneRecord.find({ userId }).populate({
    path: "paperCrane",
    select: "title content style sender",
  });

  paperCraneRecords.filter((record) => record.paperCrane.sender.id === userId);
  return res.send({ success: true, data: paperCraneRecords });
});

router.get("/received", async (req: Request, res: Response) => {});

router.get("/starred", async (req: Request, res: Response) => {});

router.get("/unread", async (req: Request, res: Response) => {});

export { router as listRouter };
