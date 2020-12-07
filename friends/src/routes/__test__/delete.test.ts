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
  const id = mongoose.Types.ObjectId().toHexString();
  await request(app)
    .delete("/api/friends/" + id)
    .send()
    .expect(401);
});

it("returns 400 bad request if the friend attempting to delete is not found", async () => {
  const id = mongoose.Types.ObjectId().toHexString();

  const fakeUser = {
    id: mongoose.Types.ObjectId().toHexString(),
    email: "user@user.com",
    role: UserRole.user,
  };

  const user = User.build({ id: fakeUser.id });
  await user.save();
  const friendRelation = Friend.build({ user: user.id, friends: [] });
  await friendRelation.save();

  await request(app)
    .delete("/api/friends/" + id)
    .set("Cookie", global.getTestCookie(fakeUser))
    .send()
    .expect(400);
});

it("deletes friend on valid request", async () => {
  const fakeUser = {
    id: mongoose.Types.ObjectId().toHexString(),
    email: "user@user.com",
    role: UserRole.user,
  };
  const fakeUserFriend = {
    id: mongoose.Types.ObjectId().toHexString(),
    email: "friend@friend.com",
    role: UserRole.user,
  };

  const user = User.build({ id: fakeUser.id });
  await user.save();
  const friend = User.build({ id: fakeUserFriend.id });
  await friend.save();
  const friendRelation = Friend.build({ user: user.id, friends: [friend] });
  await friendRelation.save();

  const response = await request(app)
    .delete("/api/friends/" + fakeUserFriend.id)
    .set("Cookie", global.getTestCookie(fakeUser))
    .send()
    .expect(204);

  expect(response.body.success).toBeTruthy();

  const newFriendRelation = await Friend.find({ user: fakeUser.id });
  expect(newFriendRelation.length).toBe(0);
});
