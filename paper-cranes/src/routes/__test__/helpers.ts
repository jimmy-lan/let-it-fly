/*
 * Created by Jimmy Lan
 * Creation Date: 2020-12-07
 */

import mongoose from "mongoose";
import { UserRole } from "@ly-letitfly/common";
import {
  PaperCrane,
  PaperCraneRecord,
  Reply,
  User,
  UserProperty,
} from "../../models";

export const addFakeUser = async () => {
  const id = mongoose.Types.ObjectId().toHexString();
  const fakeUser = {
    id,
    email: id + "@user.com",
    role: UserRole.user,
  };

  const user = User.build({ id: fakeUser.id });
  await user.save();

  const property = UserProperty.build({ id: fakeUser.id });
  await property.save();

  return fakeUser;
};

export const addPaperStyle = async (userId: string, style: string) => {
  const property = await UserProperty.findById(userId);

  property!.paperCraneStyles.push(style);
  await property!.save();
};

export const addPaperCraneWithRecord = async (
  senderId: string,
  receiverId: string,
  title: string,
  content: string,
  style: string,
  isUnread: boolean = false,
  isStarred: boolean = false
) => {
  const paperCrane = PaperCrane.build({
    senderId,
    receiverId,
    title,
    content,
    style,
  });
  await paperCrane.save();

  const paperCraneSenderRecord = PaperCraneRecord.build({
    userId: senderId,
    isDeleted: false,
    isStarred,
    isUnread,
    paperCrane,
  });
  await paperCraneSenderRecord.save();

  const paperCraneReceiverRecord = PaperCraneRecord.build({
    userId: receiverId,
    isDeleted: false,
    isStarred,
    isUnread,
    paperCrane,
  });
  await paperCraneReceiverRecord.save();

  return paperCrane;
};

export const addPaperCraneWithRecordNoReceiver = async (
  senderId: string,
  title: string,
  content: string,
  style: string,
  isUnread: boolean = false,
  isStarred: boolean = false
) => {
  const sender = await User.findById(senderId);
  const paperCrane = PaperCrane.build({
    senderId,
    title,
    content,
    style,
  });
  await paperCrane.save();

  const paperCraneSenderRecord = PaperCraneRecord.build({
    userId: senderId,
    isDeleted: false,
    isStarred,
    isUnread,
    paperCrane,
  });
  await paperCraneSenderRecord.save();

  return paperCrane;
};

export const addReply = async (
  paperCraneId: string,
  senderId: string,
  content: string,
  isWishToConnect: boolean = false
) => {
  const sender = await User.findById(senderId);
  const paperCrane = await PaperCrane.findById(paperCraneId);

  const reply = Reply.build({ sender: sender!, content, isWishToConnect });
  await reply.save();

  paperCrane!.replies.push(reply);
  await paperCrane!.save();

  return reply;
};
