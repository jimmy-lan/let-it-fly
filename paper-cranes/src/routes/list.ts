/*
 * Created by Jimmy Lan
 * Creation Date: 2020-12-07
 */

import express, { Request, Response } from "express";
import { query } from "express-validator";
import { PaperCraneRecord, PaperCraneRecordDocument } from "../models";
import {
  ForbiddenError,
  requireAdmin,
  UserRole,
  validateRequest,
} from "@ly-letitfly/common";

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

router.get(
  "/sent",
  [
    query("limit").optional().isInt({ gt: 0 }),
    query("skip").optional().isInt({ gt: 0 }),
  ],
  validateRequest,
  async (req: Request, res: Response) => {
    const { skip, limit } = req.query;
    const userId = req.user!.id;

    const findLimit: number = limit ? Number(limit) : 0;
    const findSkip: number = skip ? Number(skip) : 0;

    // Query paper crane record
    const paperCraneRecords = await PaperCraneRecord.find({ userId })
      .limit(findLimit)
      .skip(findSkip)
      .populate({
        path: "paperCrane",
        select: "title content style senderId",
      })
      .exec();

    const filteredRecords = paperCraneRecords
      .filter(
        (record) =>
          record.paperCrane.senderId.toString() === userId && !record.isDeleted
      )
      .map(mapRecordsToPaperCrane);

    return res.send({ success: true, data: filteredRecords });
  }
);

router.get(
  "/received",
  [
    query("limit").optional().isInt({ gt: 0 }),
    query("skip").optional().isInt({ gt: 0 }),
  ],
  validateRequest,
  async (req: Request, res: Response) => {
    const { skip, limit } = req.query;
    const userId = req.user!.id;

    const findLimit: number = limit ? Number(limit) : 0;
    const findSkip: number = skip ? Number(skip) : 0;

    // Query paper crane record
    const paperCraneRecords = await PaperCraneRecord.find({ userId })
      .limit(findLimit)
      .skip(findSkip)
      .populate({
        path: "paperCrane",
        select: "title content style receiverId",
      })
      .exec();

    const filteredRecords = paperCraneRecords
      .filter(
        (record) =>
          record.paperCrane.receiverId?.toString() === userId &&
          !record.isDeleted
      )
      .map(mapRecordsToPaperCrane);
    return res.send({ success: true, data: filteredRecords });
  }
);

router.get(
  "/starred",
  [
    query("limit").optional().isInt({ gt: 0 }),
    query("skip").optional().isInt({ gt: 0 }),
  ],
  validateRequest,
  async (req: Request, res: Response) => {
    const { skip, limit } = req.query;
    const userId = req.user!.id;

    const findLimit: number = limit ? Number(limit) : 0;
    const findSkip: number = skip ? Number(skip) : 0;

    // Query paper crane record
    const paperCraneRecords = await PaperCraneRecord.find({ userId })
      .limit(findLimit)
      .skip(findSkip)
      .populate({
        path: "paperCrane",
        select: "title content style",
      })
      .exec();
    const filteredRecords = paperCraneRecords
      .filter((record) => record.isStarred && !record.isDeleted)
      .map(mapRecordsToPaperCrane);
    return res.send({ success: true, data: filteredRecords });
  }
);

router.get(
  "/unread",
  [
    query("limit").optional().isInt({ gt: 0 }),
    query("skip").optional().isInt({ gt: 0 }),
  ],
  validateRequest,
  async (req: Request, res: Response) => {
    const { skip, limit } = req.query;
    const userId = req.user!.id;

    const findLimit: number = limit ? Number(limit) : 0;
    const findSkip: number = skip ? Number(skip) : 0;

    // Query paper crane record
    const paperCraneRecords = await PaperCraneRecord.find({ userId })
      .limit(findLimit)
      .skip(findSkip)
      .populate({
        path: "paperCrane",
        select: "title content style",
      });

    const filteredRecords = paperCraneRecords
      .filter((record) => record.isUnread && !record.isDeleted)
      .map(mapRecordsToPaperCrane);
    return res.send({ success: true, data: filteredRecords });
  }
);

router.get(
  "/list",
  [
    query("limit").optional().isInt({ gt: 0 }),
    query("skip").optional().isInt({ gt: 0 }),
  ],
  validateRequest,
  requireAdmin,
  async (req: Request, res: Response) => {
    if (req.user!.role !== UserRole.admin) {
      throw new ForbiddenError();
    }

    const { skip, limit } = req.query;

    const findLimit: number = limit ? Number(limit) : 0;
    const findSkip: number = skip ? Number(skip) : 0;

    // Query paper crane record
    const paperCraneRecords = await PaperCraneRecord.find({})
      .limit(findLimit)
      .skip(findSkip)
      .populate({
        path: "paperCrane",
      });

    const paperCranes = paperCraneRecords.map((record) => record.paperCrane);
    return res.send({ success: true, data: paperCranes });
  }
);

export { router as listRouter };
