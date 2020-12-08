/*
 * Created by Jimmy Lan
 * Creation Date: 2020-12-07
 */

import mongoose from "mongoose";
import request from "supertest";
import { app } from "../../app";
import { addFakeUser, addPaperCraneWithRecord, addPaperStyle } from "./helpers";
import { PaperCraneRecord } from "../../models";

it("returns 401 when user is not authenticated", async () => {
  const id = mongoose.Types.ObjectId().toHexString();
  await request(app)
    .delete("/api/paper-cranes/" + id + "/delete")
    .send({})
    .expect(401);
});

it("returns 400 if paper crane attempting to delete does not exist", async () => {
  const id = mongoose.Types.ObjectId().toHexString();
  const user = await addFakeUser();

  const response = await request(app)
    .delete("/api/paper-cranes/" + id + "/delete")
    .set("Cookie", global.getTestCookie(user))
    .send({})
    .expect(400);

  expect(response.body.success).toBeFalsy();
});

it("deletes paper crane on valid request", async () => {
  const user1 = await addFakeUser();
  const user2 = await addFakeUser();

  await addPaperStyle(user1.id, "#ccc");
  await addPaperStyle(user2.id, "#ccc");

  const paperCrane = await addPaperCraneWithRecord(
    user1.id,
    user2.id,
    "test",
    "test content",
    "#ccc"
  );

  const response = await request(app)
    .delete("/api/paper-cranes/" + paperCrane.id + "/delete")
    .set("Cookie", global.getTestCookie(user1))
    .send({})
    .expect(202);

  expect(response.body.success).toBeTruthy();
  const paperCraneRecord = await PaperCraneRecord.findOne({
    paperCrane,
  });
  // soft deletion
  expect(paperCraneRecord).toBeDefined();
  expect(paperCraneRecord!.isDeleted).toBeTruthy();
});
