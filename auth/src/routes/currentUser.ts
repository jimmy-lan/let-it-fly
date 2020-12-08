/*
 * Created by Jimmy Lan
 * Creation Date: 2020-12-01
 */

import express, { Request, Response } from "express";
import { extractUser, UnauthorizedError } from "@ly-letitfly/common";

const router = express.Router();

/**
 * Obtain information regarding the authenticated user.
 */
router.get("/current", extractUser, (req: Request, res: Response) => {
  if (!req.user) {
    throw new UnauthorizedError();
  }
  return res.send({ success: true, data: req.user });
});

export { router as currentUserRouter };
