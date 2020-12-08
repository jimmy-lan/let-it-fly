/*
 * Created by Jimmy Lan
 * Creation Date: 2020-12-07
 */

import mongoose from "mongoose";
import request from "supertest";
import { app } from "../../app";
import { addFakeUser, addPaperCraneWithRecord, addPaperStyle } from "./helpers";
import { UserRole } from "@ly-letitfly/common";
import { PaperCrane } from "../../models";

jest.mock("../../services/NatsWrapper");

it("returns 401 when user is not authenticated", async () => {
  const id = mongoose.Types.ObjectId().toHexString();
  await request(app)
    .post("/api/paper-cranes/" + id + "/reply")
    .send({})
    .expect(401);
});

it("returns 400 if paper crane does not exist", async () => {
  const id = mongoose.Types.ObjectId().toHexString();
  const user = await addFakeUser();

  const response = await request(app)
    .post("/api/paper-cranes/" + id + "/reply")
    .set("Cookie", global.getTestCookie(user))
    .send({ content: "reply reply", isWishToConnect: false })
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
    .post("/api/paper-cranes/" + id + "/reply")
    .set("Cookie", global.getTestCookie(user))
    .send({ content: "reply reply", isWishToConnect: false })
    .expect(400);

  expect(response.body.success).toBeFalsy();
});

it("adds reply on a valid request", async () => {
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
    .post("/api/paper-cranes/" + paperCrane.id + "/reply")
    .set("Cookie", global.getTestCookie(user2))
    .send({ content: "reply reply", isWishToConnect: false })
    .expect(201);

  expect(response.body.success).toBeTruthy();
  expect(response.body.data).toBeDefined();
  expect(response.body.data.content).toEqual("reply reply");
  const savedPaperCrane = await PaperCrane.findById(paperCrane.id).populate(
    "replies"
  );
  expect(savedPaperCrane!.replies.length).toBe(1);
  expect(savedPaperCrane!.replies[0].content).toEqual("reply reply");
  expect(savedPaperCrane!.replies[0].isWishToConnect).toBeFalsy();
});
