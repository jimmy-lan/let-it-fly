/*
 * Created by Jimmy Lan
 * Creation Date: 2020-11-30
 * Description:
 *    Extract user information from the current session and
 *    store it in req.user for future access.
 */

import { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken";
import { UnauthorizedError } from "../errors";

/**
 * Interface describing properties encoded inside of an authentication
 * token jwt that pass on to req.user.
 */
interface UserProps {
  id: string;
  email: string;
  role: string;
}

// Override Express declaration to include currentUser property
declare global {
  namespace Express {
    interface Request {
      user?: UserProps;
    }
  }
}

export const extractUser = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  if (!req.session?.jwt) {
    return next();
  }

  try {
    req.user = jwt.verify(
      req.session.jwt,
      process.env.JWT_SECRET!
    ) as UserProps;
  } catch (error) {
    console.error(error);
    throw new UnauthorizedError();
  }

  next();
};
