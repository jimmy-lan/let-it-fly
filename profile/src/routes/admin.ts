/*
 * Created by Jimmy Lan
 * Creation Date: 2020-12-10
 * Description: Temporary admin routes.
 */

import express, { Request, Response } from "express";
import { query } from "express-validator";
import { requireAdmin, validateRequest } from "@ly-letitfly/common";
import { User } from "../models";

const router = express.Router();

/**
 * Get all user profile
 */
router.get(
  "/",
  requireAdmin,
  [
    query("limit").optional().isInt({ gt: 0 }),
    query("skip").optional().isInt({ gt: 0 }),
  ],
  validateRequest,
  async (req: Request, res: Response) => {
    const { skip, limit } = req.query;

    const findLimit: number = limit ? Number(limit) : 0;
    const findSkip: number = skip ? Number(skip) : 0;

    const users = await User.find().skip(findSkip).limit(findLimit).exec();

    return res.send({ success: true, body: users });
  }
);

export { router as adminRouter };
