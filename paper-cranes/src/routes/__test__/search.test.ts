/*
 * Created by Jimmy Lan
 * Creation Date: 2020-12-07
 */

import request from "supertest";
import mongoose from "mongoose";
import { app } from "../../app";
import {
  addFakeUser,
  addPaperCraneWithRecordNoReceiver,
  addPaperStyle,
} from "./helpers";

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
});
