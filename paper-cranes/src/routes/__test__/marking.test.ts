/*
 * Created by Jimmy Lan
 * Creation Date: 2020-12-07
 */

import mongoose from "mongoose";
import request from "supertest";
import { app } from "../../app";
import {
  addFakeUser,
  addPaperCraneWithRecord,
  addPaperCraneWithRecordNoReceiver,
  addPaperStyle,
} from "./helpers";
import { PaperCraneRecord } from "../../models";

it("returns 401 when user is not authenticated", async () => {
  const id = mongoose.Types.ObjectId().toHexString();
  await request(app)
    .patch("/api/paper-cranes/" + id + "/marking")
    .send({})
    .expect(401);
});

it("returns 400 if paper crane does not exist", async () => {
  const id = mongoose.Types.ObjectId().toHexString();
  const user = await addFakeUser();

  const response = await request(app)
    .patch("/api/paper-cranes/" + id + "/marking")
    .set("Cookie", global.getTestCookie(user))
    .send({ isStarred: true })
    .expect(400);

  expect(response.body.success).toBeFalsy();
});

it("returns 403 if user does not have sufficient permission to patch", async () => {
  const user1 = await addFakeUser();
  const user2 = await addFakeUser();
  const paperCrane = await addPaperCraneWithRecordNoReceiver(
    user1.id,
    "title",
    "content",
    "#ccc"
  );

  const response = await request(app)
    .patch("/api/paper-cranes/" + paperCrane.id + "/marking")
    .set("Cookie", global.getTestCookie(user2))
    .send({ isStarred: false, isUnread: true })
    .expect(403);

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
    .patch("/api/paper-cranes/" + paperCrane.id + "/marking")
    .set("Cookie", global.getTestCookie(user2))
    .send({ isStarred: true, isUnread: true })
    .expect(200);

  expect(response.body.success).toBeTruthy();
  expect(response.body.data).toBeDefined();
  expect(response.body.data.id).toEqual(paperCrane.id);
  expect(response.body.data.isStarred).toBeTruthy();
  expect(response.body.data.isUnread).toBeTruthy();

  const paperCraneRecord = await PaperCraneRecord.findOne({
    userId: user2.id,
    paperCrane,
  });

  expect(paperCraneRecord!.isStarred).toBeTruthy();
  expect(paperCraneRecord!.isUnread).toBeTruthy();
});

it("updates only paper crane record for requested user on successful requests", async () => {
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
    .patch("/api/paper-cranes/" + paperCrane.id + "/marking")
    .set("Cookie", global.getTestCookie(user2))
    .send({ isStarred: true, isUnread: true })
    .expect(200);

  expect(response.body.success).toBeTruthy();
  expect(response.body.data).toBeDefined();
  expect(response.body.data.id).toEqual(paperCrane.id);
  expect(response.body.data.isStarred).toBeTruthy();
  expect(response.body.data.isUnread).toBeTruthy();

  const paperCraneRecord = await PaperCraneRecord.findOne({
    userId: user1.id,
    paperCrane,
  });

  expect(paperCraneRecord!.isStarred).toBeFalsy();
  expect(paperCraneRecord!.isUnread).toBeFalsy();
});
