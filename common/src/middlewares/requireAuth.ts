/*
 * Created by Jimmy Lan
 * Creation Date: 2020-11-30
 * Description: Helper middleware to determine whether req.user is set.
 *
 * PRE-CONDITION:
 * Use this middleware after applying the extractUser middleware or
 * equivalent.
 */

import { NextFunction, Request, Response } from "express";
import { UnauthorizedError } from "../errors";

export const requireAuth = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  if (!req.user) {
    throw new UnauthorizedError();
  }

  return next();
};
