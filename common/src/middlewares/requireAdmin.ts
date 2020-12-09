/*
 * Created by Jimmy Lan
 * Creation Date: 2020-12-08
 * Description: A stronger version of requireAuth middleware,
 *    which require admin user role in order to access.
 */

import { NextFunction, Request, Response } from "express";
import { ForbiddenError, UnauthorizedError } from "../errors";
import { UserRole } from "../enums";

/**
 * A stronger version of requireAuth middleware,
 * which require admin user role in order to access.
 */
export const requireAdmin = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  if (!req.user) {
    throw new UnauthorizedError();
  }

  if (req.user.role !== UserRole.admin) {
    throw new ForbiddenError();
  }

  return next();
};
