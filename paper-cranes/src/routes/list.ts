/*
 * Created by Jimmy Lan
 * Creation Date: 2020-12-07
 */

import express, { Request, Response, NextFunction } from "express";
import mongoose from "mongoose";

const router = express.Router();

router.get("/sent", async (req: Request, res: Response) => {});

router.get("/received", async (req: Request, res: Response) => {});

router.get("/starred", async (req: Request, res: Response) => {});

router.get("/unread", async (req: Request, res: Response) => {});

export { router as listRouter };
