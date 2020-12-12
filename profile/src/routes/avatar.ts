/*
 * Created by Jimmy Lan
 * Creation Date: 2020-12-09
 */

import express, { Request, Response, Express, NextFunction } from "express";
import multer from "multer";
import { natsWrapper, storage } from "../services";
import {
  BadRequestError,
  ForbiddenError,
  InternalServerError,
  UserRole,
  validateRequest,
} from "@ly-letitfly/common";
import { User } from "../models";
import { UserInfoUpdateMsgSender } from "../messages/senders";
import { param } from "express-validator";
import mongoose from "mongoose";

const router = express.Router();

// Configure multer
const multerMid = multer({
  storage: multer.memoryStorage(),
  limits: {
    // File size: 10MB
    fileSize: 10 * 1024 * 1024,
  },
});

router.use(multerMid.single("file"));

const uploadImage = (file: Express.Multer.File): Promise<string> => {
  return new Promise((resolve, reject) => {
    const { originalname, buffer } = file;

    const bucket = storage.bucket("let-it-fly-website");

    const blob = bucket.file(originalname.replace(/ /g, "_"));
    const blobStream = blob.createWriteStream({ resumable: false });

    blobStream
      .on("finish", () => {
        const imageUrl = `https://storage.googleapis.com/${bucket.name}/${blob.name}`;
        resolve(imageUrl);
      })
      .on("error", (error) => {
        reject(error.message);
      })
      .end(buffer);
  });
};

const patchUserAvatar = async (req: Request, res: Response) => {
  const { userId } = req.params;

  // Find current user
  const user = await User.findById(userId);
  if (!user) {
    throw new BadRequestError(
      "The current user is not found. A message may be missing."
    );
  }

  // Upload image
  let imageUrl;
  try {
    imageUrl = await uploadImage(req.file);
  } catch (error) {
    console.error(error);
    throw new InternalServerError();
  }

  // Update user avatar
  user.avatar = imageUrl;
  await user.save();

  // Emit event
  await new UserInfoUpdateMsgSender(natsWrapper.client).send({
    id: user.id!,
    avatar: user.avatar,
    firstName: user.personal.name.first,
    lastName: user.personal.name.last,
    __v: user.__v,
  });

  return res.send({ success: true, data: imageUrl });
};

router.patch(
  "/avatar",
  async (req: Request, res: Response, next: NextFunction) => {
    req.params.userId = req.user!.id;
    next();
  },
  patchUserAvatar
);

router.patch(
  "/:userId/avatar",
  [
    param("userId")
      .custom((userId: string) => mongoose.Types.ObjectId.isValid(userId))
      .withMessage("User ID must be a valid Object ID type."),
  ],
  validateRequest,
  async (req: Request, res: Response, next: NextFunction) => {
    const { userId } = req.params;

    // Check for permission
    if (req.user?.role !== UserRole.admin && req.user?.id !== userId) {
      throw new ForbiddenError();
    }

    next();
  },
  patchUserAvatar
);

export { router as avatarRouter };
