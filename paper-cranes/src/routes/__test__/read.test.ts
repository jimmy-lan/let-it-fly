/*
 * Created by Jimmy Lan
 * Creation Date: 2020-12-07
 */

import mongoose from "mongoose";
import request from "supertest";
import { app } from "../../app";
import { addFakeUser, addPaperCraneWithRecord, addPaperStyle } from "./helpers";

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
  expect(response.body.data.title).toEqual("title");
  expect(response.body.data.content).toEqual("content");
  expect(response.body.data.style).toEqual("#ccc");
  expect(response.body.data.sender).not.toBeDefined();
  expect(response.body.data.receiver).not.toBeDefined();
});
