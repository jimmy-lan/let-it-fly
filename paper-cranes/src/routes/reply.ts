/*
 * Created by Jimmy Lan
 * Creation Date: 2020-12-07
 */

import express, { Request, Response, NextFunction } from "express";
import mongoose from "mongoose";

const router = express.Router();

router.post("/:id/reply", async (req: Request, res: Response) => {});

export { router as replyRouter };
