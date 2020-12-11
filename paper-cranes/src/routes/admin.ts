/*
 * Created by Jimmy Lan
 * Creation Date: 2020-12-10
 */

import express, { Request, Response } from "express";
import { requireAdmin, validateRequest } from "@ly-letitfly/common";
import { PaperCrane } from "../models";
import { query } from "express-validator";

const router = express.Router();

router.use(requireAdmin);

router.get(
  "/",
  [
    query("limit").optional().isInt({ gt: 0 }),
    query("skip").optional().isInt({ gt: 0 }),
  ],
  validateRequest,
  async (req: Request, res: Response) => {
    const { limit, skip } = req.query;

    const findLimit: number = limit ? Number(limit) : 0;
    const findSkip: number = skip ? Number(skip) : 0;

    const paperCranes = await PaperCrane.find().skip(findSkip).limit(findLimit);

    return res.send({ success: true, data: paperCranes });
  }
);

export { router as adminRouter };
