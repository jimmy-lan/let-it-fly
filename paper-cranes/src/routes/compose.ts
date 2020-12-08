/*
 * Created by Jimmy Lan
 * Creation Date: 2020-12-07
 */

import express, { Request, Response } from "express";
import { body } from "express-validator";
import { BadRequestError, validateRequest } from "@ly-letitfly/common";
import { PaperCrane, PaperCraneRecord, User, UserProperty } from "../models";

const router = express.Router();

router.post(
  "/",
  [
    body("title").isString().not().isEmpty(),
    body("content").isString().not().isEmpty(),
    body("style").isString().not().isEmpty(),
  ],
  validateRequest,
  async (req: Request, res: Response) => {
    const { title, content, style } = req.body;
    const userId = req.user!.id;

    // Query current user
    const currentUser = await User.findById(userId);
    if (!currentUser) {
      throw new Error("User not initialized. An event may be missing.");
    }

    // Check if current user has style
    const property = await UserProperty.findById(userId);
    if (!property) {
      throw new Error(
        "User property not initialized. An event may be missing."
      );
    }
    if (!property.paperCraneStyles.includes(style)) {
      throw new BadRequestError(
        `User ${userId} does not own paper crane style ${style}`
      );
    }

    // Create new instance of paper crane
    const paperCrane = await PaperCrane.build({
      title,
      content,
      style,
      sender: currentUser,
    });
    await paperCrane.save();

    const paperCraneRecord = await PaperCraneRecord.build({
      userId,
      paperCrane,
    });
    await paperCraneRecord.save();

    const data = {
      id: paperCrane.id,
      title: paperCrane.title,
      content: paperCrane.content,
      style: paperCrane.style,
    };
    return res.status(201).send({ success: true, data });
  }
);

export { router as composeRouter };
