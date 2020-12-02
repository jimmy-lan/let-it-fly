/*
 * Created by Jimmy Lan
 * Creation Date: 2020-12-01
 */

import express, { Request, Response } from "express";
import {
  BadRequestError,
  UserRole,
  validateRequest,
} from "@ly-letitfly/common";
import { body } from "express-validator";
import jwt from "jsonwebtoken";
import { User } from "../models";

const router = express.Router();

/**
 * Signup user, should provide <email> and <password> in request body.
 */
router.post(
  "/signup",
  [
    body("email").isEmail().withMessage("Email must be valid"),
    body("password").notEmpty().withMessage("Password must be provided"),
  ],
  validateRequest,
  async (req: Request, res: Response) => {
    const { email, password } = req.body;

    await abortIfUserExists(email);

    const user = User.build({ email, password, role: UserRole.user });
    await user.save();

    generateJwtWithSession(
      {
        id: user.id,
        email: user.email,
        role: user.role,
      },
      req
    );

    return res.status(201).send({ success: true, data: user });
  }
);

/**
 * Check if user with <email> exists. If true, throw
 * an error to terminate the process.
 *
 * @param email user's email to be check
 * @throws BadRequestError
 */
const abortIfUserExists = async (email: string) => {
  const existingUser = await User.findOne({ email }).lean();

  if (existingUser) {
    const errorMessage = `Email ${email} is in use.`;
    throw new BadRequestError(errorMessage);
  }
};

const generateJwtWithSession = (jwtBody: Object, req: Request) => {
  const userJwt = jwt.sign(jwtBody, process.env.JWT_SECRET!);

  req.session = {
    jwt: userJwt,
  };
};

export { router as signupRouter };
