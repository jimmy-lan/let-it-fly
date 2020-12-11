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
import { User } from "../models";
import { generateJwtWithSession } from "../helpers";
import { AccountSignUpMsgSender } from "../messages/senders";
import { natsWrapper } from "../services";

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

    const user = User.build({ email, password, role: UserRole.guest });
    await user.save();

    // Emit sign up message
    await new AccountSignUpMsgSender(natsWrapper.client).send({
      id: user.id!,
      email: user.email!,
    });

    await generateJwtWithSession(
      {
        id: user.id!,
        email: user.email!,
        role: user.role!,
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

export { router as signupRouter };
