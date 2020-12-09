/*
 * Created by Jimmy Lan
 * Creation Date: 2020-12-07
 */

import express, { Request, Response } from "express";
import { body } from "express-validator";
import { BadRequestError, validateRequest } from "@ly-letitfly/common";
import { PaperCrane, PaperCraneRecord, UserProperty } from "../models";

const router = express.Router();

router.post(
  "/",
  [
    body("title").not().isEmpty().withMessage("title must be provided"),
    body("content").not().isEmpty().withMessage("content must be provided"),
    body("style").not().isEmpty().withMessage("style must be provided"),
  ],
  validateRequest,
  async (req: Request, res: Response) => {
    const { title, content, style } = req.body;
    const userId = req.user!.id;

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
      senderId: userId,
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
