/*
 * Created by Jimmy Lan
 * Creation Date: 2020-12-08
 */

import express, { Request, Response } from "express";
import { query } from "express-validator";
import { requireAdmin, validateRequest } from "@ly-letitfly/common";
import { User } from "../models";

const router = express.Router();

router.get(
  "/",
  [
    query("limit").optional().isInt({ gt: 0 }),
    query("skip").optional().isInt({ gt: 0 }),
  ],
  validateRequest,
  requireAdmin,
  async (req: Request, res: Response) => {
    const { skip, limit } = req.query;

    const findLimit: number = limit ? Number(limit) : 0;
    const findSkip: number = skip ? Number(skip) : 0;

    // Query users
    const users = await User.find({}).limit(findLimit).skip(findSkip).exec();

    return res.send({ success: true, data: users });
  }
);

export { router as adminRouter };
