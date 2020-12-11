/*
 * Created by Jimmy Lan
 * Creation Date: 2020-12-08
 * Description: routes handling role-relating operations.
 */

import express, { Request, Response } from "express";
import { body } from "express-validator";
import {
  BadRequestError,
  extractUser,
  requireAuth,
  UserRole,
  validateRequest,
} from "@ly-letitfly/common";
import { User } from "../models";
import { AccountRoleUpdateUserMsgSender } from "../messages/senders";
import { natsWrapper } from "../services";
import { generateJwtWithSession } from "../helpers";

const router = express.Router();

/**
 * Route for guest users to update basic personal information.
 * Once update is successful, the guest user becomes a regular user.
 */
router.post(
  "/roles/upgrade",
  [
    body("firstName")
      .notEmpty()
      .isLength({ max: 35 })
      .withMessage("first name must have length between 1 and 35"),
    body("lastName")
      .notEmpty()
      .isLength({ max: 35 })
      .withMessage("last name must have length between 1 and 35"),
  ],
  validateRequest,
  extractUser,
  requireAuth,
  async (req: Request, res: Response) => {
    const currentUser = req.user!;
    const { firstName, lastName } = req.body;

    // Check for correct role
    if (currentUser.role !== UserRole.guest) {
      throw new BadRequestError("You don't need to upgrade role.");
    }

    // Find model for the current user
    const user = await User.findById(currentUser.id);

    if (!user) {
      throw new BadRequestError("Please stop faking to be a valid user!");
    }

    // Update personal information on user model
    user.set({ role: UserRole.user, firstName, lastName });
    await user.save();

    // Send message
    await new AccountRoleUpdateUserMsgSender(natsWrapper.client).send({
      id: user.id!,
      firstName: user.firstName!,
      lastName: user.lastName!,
    });

    // Set a new cookie with updated role
    generateJwtWithSession(
      { id: user.id, email: user.email, role: user.role },
      req
    );

    // Send a response
    return res.send({ success: true, data: user });
  }
);

export { router as roleRouter };
