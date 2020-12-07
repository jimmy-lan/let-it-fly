/*
 * Created by Jimmy Lan
 * Creation Date: 2020-12-07
 */

import mongoose from "mongoose";
import request from "supertest";
import { app } from "../../app";
import { UserRole } from "@ly-letitfly/common";
import { Friend, User } from "../../models";

it("returns 401 if user is not authenticated", async () => {
  await request(app).get("/api/friends").send().expect(401);
});

it("returns 400 bad request if the user is not found", async () => {
  await request(app)
    .get("/api/friends")
    .set("Cookie", global.getTestCookie())
    .send()
    .expect(400);
});

it("returns an empty list when the user does not have friends", async () => {
  const fakeUser = {
    id: mongoose.Types.ObjectId().toHexString(),
    email: "user@user.com",
    role: UserRole.user,
  };

  const user = User.build({ id: fakeUser.id });
  await user.save();
  const friendRelation = Friend.build({ user: user, friends: [] });
  await friendRelation.save();

  const response = await request(app)
    .get("/api/friend")
    .set("Cookie", global.getTestCookie(fakeUser))
    .send()
    .expect(200);

  expect(response.body.success).toBeTruthy();
  expect(response.body.data.length).toEqual(0);
});
