/*
 * Created by Jimmy Lan
 * Creation Date: 2020-12-07
 */

import mongoose from "mongoose";
import request from "supertest";
import { app } from "../../app";
import { UserRole } from "@ly-letitfly/common";
import { addFakeUser, addPaperCraneWithRecord, addPaperStyle } from "./helpers";
import { PaperCraneRecord } from "../../models";

it("returns 401 when user is not authenticated", async () => {
  const id = mongoose.Types.ObjectId().toHexString();
  await request(app)
    .patch("/api/paper-crane/" + id)
    .send({})
    .expect(401);
});

it("returns 400 if paper crane does not exist", async () => {
  const id = mongoose.Types.ObjectId().toHexString();
  const user = await addFakeUser();

  const response = await request(app)
    .patch("/api/paper-cranes/" + id)
    .set("Cookie", global.getTestCookie(user))
    .send({ isStarred: true })
    .expect(400);

  expect(response.body.success).toBeFalsy();
});

it("returns 400 if user does not exist", async () => {
  const id = mongoose.Types.ObjectId().toHexString();
  const user = {
    id,
    email: "user@user.com",
    role: UserRole.user,
  };

  const response = await request(app)
    .patch("/api/paper-cranes/" + id)
    .set("Cookie", global.getTestCookie(user))
    .send({ isStarred: true })
    .expect(400);

  expect(response.body.success).toBeFalsy();
});

it("successfully updates paper crane record on valid requests", async () => {
  const user1 = await addFakeUser();
  const user2 = await addFakeUser();

  await addPaperStyle(user1.id, "#ccc");
  await addPaperStyle(user2.id, "#ccc");

  const paperCrane = await addPaperCraneWithRecord(
    user1.id,
    user2.id,
    "title",
    "content",
    "#ccc"
  );

  const response = await request(app)
    .patch("/api/paper-cranes/" + paperCrane.id)
    .set("Cookie", global.getTestCookie(user2))
    .send({ isStarred: true, isUnread: true })
    .expect(200);

  expect(response.body.success).toBeTruthy();
  expect(response.body.data).toBeDefined();
  expect(response.body.data.isStarred).toBeTruthy();
  expect(response.body.data.isUnread).toBeTruthy();

  const paperCraneRecord = await PaperCraneRecord.findOne({ paperCrane });
  expect(paperCraneRecord!.isStarred).toBeTruthy();
  expect(paperCraneRecord!.isUnread).toBeTruthy();
});
