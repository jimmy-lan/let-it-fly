/*
 * Created by Jimmy Lan
 * Creation Date: 2020-12-09
 */

import express, { Request, Response, Express } from "express";
import multer from "multer";
import { natsWrapper, storage } from "../services";
import { BadRequestError, InternalServerError } from "@ly-letitfly/common";
import { User } from "../models";
import { UserInfoUpdateMsgSender } from "../messages/senders";

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
  return new Promise((reject, resolve) => {
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

router.patch("/avatar", async (req: Request, res: Response) => {
  const userId = req.user!.id;

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
    id: user.id,
    avatar: user.avatar,
    firstName: user.personal.name.first,
    lastName: user.personal.name.last,
    __v: user.__v,
  });

  return res.send({ success: true, data: imageUrl });
});
