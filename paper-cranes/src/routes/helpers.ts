/*
 * Created by Jimmy Lan
 * Creation Date: 2020-12-08
 */

import {
  PaperCrane,
  PaperCraneDocument,
  PaperCraneRecord,
  PaperCraneRecordDocument,
  User,
  UserDocument,
} from "../models";
import { BadRequestError, ForbiddenError } from "@ly-letitfly/common";

export const findPaperCraneAndRecord = async (
  userId: string,
  paperCraneId: string
): Promise<[PaperCraneDocument, PaperCraneRecordDocument]> => {
  const paperCrane = await PaperCrane.findById(paperCraneId);
  if (!paperCrane) {
    throw new BadRequestError(`Paper crane ${paperCraneId} does not exist`);
  }

  const record = await PaperCraneRecord.findOne({ userId, paperCrane });
  if (!record) {
    throw new ForbiddenError();
  }
  if (record.isDeleted) {
    throw new BadRequestError(`Paper crane ${paperCraneId} does not exist`);
  }

  return [paperCrane, record];
};

export const findActiveUser = async (userId: string): Promise<UserDocument> => {
  const user = await User.findById(userId);

  if (!user) {
    throw new BadRequestError(
      "User is not found. Some messages may fail to be dispatched."
    );
  }

  return user;
};
