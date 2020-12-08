/*
 * Created by Jimmy Lan
 * Creation Date: 2020-12-07
 */

import request from "supertest";
import { app } from "../../app";
import {
  addFakeUser,
  addPaperCraneWithRecordNoReceiver,
  addPaperStyle,
} from "./helpers";
import { PaperCrane, PaperCraneRecord } from "../../models";

it("returns 401 when user is not authenticated", async () => {
  await request(app).get("/api/paper-crane").send({}).expect(401);
});

it("returns correct search result on valid request", async () => {
  const user1 = await addFakeUser();
  const user2 = await addFakeUser();

  await addPaperStyle(user1.id, "#ccc");
  await addPaperStyle(user2.id, "#ccc");

  const paperCrane = await addPaperCraneWithRecordNoReceiver(
    user1.id,
    "search",
    "search content",
    "#ccc"
  );

  const response = await request(app)
    .get("/api/paper-cranes")
    .set("Cookie", global.getTestCookie(user2))
    .send()
    .expect(200);

  expect(response.body.success).toBeTruthy();
  expect(response.body.data).toBeDefined();
  expect(response.body.data.id).toEqual(paperCrane.id);
  expect(response.body.data.style).toBeDefined();
  expect(response.body.data.style).toEqual("#ccc");

  const savedPaperCrane = await PaperCrane.findById(paperCrane.id);
  expect(savedPaperCrane!.receiverId).toBeDefined();
  expect(savedPaperCrane!.receiverId.toString()).toEqual(user2.id);

  const recordUser2 = await PaperCraneRecord.findOne({
    userId: user2.id,
  }).populate("paperCrane");
  expect(recordUser2!.paperCrane.id).toEqual(paperCrane.id);
  expect(recordUser2!.isStarred).toBeFalsy();
  expect(recordUser2!.isUnread).toBeTruthy();
});
