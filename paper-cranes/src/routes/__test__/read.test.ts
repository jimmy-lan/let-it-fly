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
  addPaperStyle,
  addReply,
} from "./helpers";
import { PaperCrane, PaperCraneRecord } from "../../models";

it("returns 401 when user is not authenticated", async () => {
  const id = mongoose.Types.ObjectId().toHexString();
  await request(app)
    .get("/api/paper-cranes/" + id + "/info")
    .send({})
    .expect(401);
});

it("returns 403 forbidden if user does not have sufficient permission to read paper crane", async () => {
  const user1 = await addFakeUser();
  const user2 = await addFakeUser();
  const user3 = await addFakeUser();

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
    .get("/api/paper-cranes/" + paperCrane.id + "/info")
    .set("Cookie", global.getTestCookie(user3))
    .send()
    .expect(403);

  expect(response.body.success).toBeFalsy();
});

it("returns a paper crane on valid request", async () => {
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
    .get("/api/paper-cranes/" + paperCrane.id + "/info")
    .set("Cookie", global.getTestCookie(user2))
    .send()
    .expect(200);

  expect(response.body.success).toBeTruthy();
  expect(response.body.data.id).toEqual(paperCrane.id);
  expect(response.body.data.title).toEqual("title");
  expect(response.body.data.content).toEqual("content");
  expect(response.body.data.style).toEqual("#ccc");
  expect(response.body.data.replies).toBeDefined();
  expect(response.body.data.replies.length).toBe(0);
  expect(response.body.data.isStarred).toBeFalsy();
  expect(response.body.data.isUnread).toBeFalsy();
  expect(response.body.data.sender).not.toBeDefined();
  expect(response.body.data.receiver).not.toBeDefined();
});

it("marks paper crane as read after request is completed", async () => {
  const user1 = await addFakeUser();
  const user2 = await addFakeUser();

  await addPaperStyle(user1.id, "#ccc");
  await addPaperStyle(user2.id, "#ccc");

  const paperCrane = await addPaperCraneWithRecord(
    user1.id,
    user2.id,
    "title",
    "content",
    "#ccc",
    true
  );

  await request(app)
    .get("/api/paper-cranes/" + paperCrane.id + "/info")
    .set("Cookie", global.getTestCookie(user2))
    .send()
    .expect(200);

  const recordUser2 = await PaperCraneRecord.findOne({
    userId: user2.id,
    paperCrane,
  });
  expect(recordUser2!.isUnread).toBeFalsy();

  // User 2 reading the paper crane should not affect the unread status
  // of user 1
  const recordUser1 = await PaperCraneRecord.findOne({
    userId: user1.id,
    paperCrane,
  });
  expect(recordUser1!.isUnread).toBeTruthy();
});

it(
  "returns a paper crane with replies showing no user information when " +
    "two users are not connected",
  async () => {
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

    await addReply(paperCrane.id, user1.id, "Reply from user 1");
    await addReply(paperCrane.id, user2.id, "Reply from user 2");
    await addReply(paperCrane.id, user1.id, "Reply from user 1 again!");

    const response = await request(app)
      .get("/api/paper-cranes/" + paperCrane.id + "/info")
      .set("Cookie", global.getTestCookie(user2))
      .send()
      .expect(200);

    expect(response.body.success).toBeTruthy();
    expect(response.body.data.id).toEqual(paperCrane.id);
    expect(response.body.data.replies).toBeDefined();
    expect(response.body.data.replies.length).toBe(3);
    expect(response.body.data.replies[0].content).toEqual("Reply from user 1");
    expect(response.body.data.replies[0].sender).toEqual("Anonymous");
    expect(response.body.data.replies[1].content).toEqual("Reply from user 2");
    expect(response.body.data.replies[1].sender).toEqual("You");
    expect(response.body.data.sender).not.toBeDefined();
    expect(response.body.data.receiver).not.toBeDefined();
  }
);

it("returns a paper crane with replies showing user information if connected", async () => {
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

  await addReply(paperCrane.id, user1.id, "Reply from user 1", true);
  await addReply(paperCrane.id, user2.id, "Reply from user 2", true);
  await addReply(paperCrane.id, user1.id, "Reply from user 1 again!");

  const paperCraneToUpdate = await PaperCrane.findById(paperCrane.id);
  paperCraneToUpdate!.wishToConnect = [user1.id, user2.id];
  await paperCraneToUpdate!.save();

  const response = await request(app)
    .get("/api/paper-cranes/" + paperCrane.id + "/info")
    .set("Cookie", global.getTestCookie(user1))
    .send()
    .expect(200);

  expect(response.body.success).toBeTruthy();
  expect(response.body.data.id).toEqual(paperCrane.id);
  expect(response.body.data.replies).toBeDefined();
  expect(response.body.data.replies.length).toBe(3);
  expect(response.body.data.replies[0].content).toEqual("Reply from user 1");
  expect(response.body.data.replies[0].sender.id).toEqual(user1.id);
  expect(response.body.data.replies[1].content).toEqual("Reply from user 2");
  expect(response.body.data.replies[1].sender.id).toEqual(user2.id);
  expect(response.body.data.sender).not.toBeDefined();
  expect(response.body.data.receiver).not.toBeDefined();
});
