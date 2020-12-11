/*
 * Created by Jimmy Lan
 * Creation Date: 2020-12-01
 */

import express, { Request, Response } from "express";
import { body } from "express-validator";
import { BadRequestError, validateRequest } from "@ly-letitfly/common";
import { PasswordEncoder, natsWrapper } from "../services";
import { User } from "../models";
import { generateJwtWithSession } from "../helpers";
import { AccountSignInMsgSender } from "../messages/senders";

const router = express.Router();

router.post(
  "/signin",
  [
    body("email").isEmail().withMessage("Email must be valid"),
    body("password").notEmpty().withMessage("Password is required"),
  ],
  validateRequest,
  async (req: Request, res: Response) => {
    const { email, password } = req.body;

    const existingUser = await User.findOne({ email });
    if (!existingUser) {
      throw new BadRequestError("Invalid credentials");
    }

    const isMatch = await PasswordEncoder.compare(
      password,
      existingUser.password
    );
    if (!isMatch) {
      throw new BadRequestError("Invalid credentials");
    }

    // Emit user sign in message
    await new AccountSignInMsgSender(natsWrapper.client).send({
      id: existingUser.id!,
      email: existingUser.email!,
    });

    generateJwtWithSession(
      {
        id: existingUser.id!,
        email: existingUser.email!,
        role: existingUser.role!,
      },
      req
    );

    return res.send({ success: true, data: existingUser });
  }
);

export { router as signinRouter };
