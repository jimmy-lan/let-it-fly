/*
 * Created by Jimmy Lan
 * Creation Date: 2020-12-03
 */
import express, { Request, Response } from "express";

const router = express.Router();

router.patch("/", async (req: Request, res: Response) => {
  return res.send({});
});
