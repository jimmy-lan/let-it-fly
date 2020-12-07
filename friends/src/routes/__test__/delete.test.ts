/*
 * Created by Jimmy Lan
 * Creation Date: 2020-12-07
 */

import mongoose from "mongoose";
import request from "supertest";
import { UserRole } from "@ly-letitfly/common";

import { app } from "../../app";
import { Friend, User, UserDocument } from "../../models";

jest.mock("../../services/NatsWrapper");

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
    .expect(202);

  expect(response.body.success).toBeTruthy();

  const newFriendRelation = await Friend.findOne({ user: fakeUser.id });
  expect(newFriendRelation!.friends.length).toBe(0);
});

it("deletes friend on valid request", async () => {
  const fakeUser = {
    id: mongoose.Types.ObjectId().toHexString(),
    email: "user@user.com",
    role: UserRole.user,
  };
  const fakeUserFriend1 = {
    id: mongoose.Types.ObjectId().toHexString(),
    email: "friend@friend.com",
    role: UserRole.user,
  };
  const fakeUserFriend2 = {
    id: mongoose.Types.ObjectId().toHexString(),
    email: "friend@friend.com",
    role: UserRole.user,
  };

  const user = User.build({ id: fakeUser.id });
  await user.save();
  const friend1 = User.build({ id: fakeUserFriend1.id });
  await friend1.save();
  const friend2 = User.build({ id: fakeUserFriend2.id });
  await friend2.save();
  const friendRelation = Friend.build({
    user: user.id,
    friends: [friend1, friend2],
  });
  await friendRelation.save();

  const response = await request(app)
    .delete("/api/friends/" + fakeUserFriend2.id)
    .set("Cookie", global.getTestCookie(fakeUser))
    .send()
    .expect(202);

  expect(response.body.success).toBeTruthy();

  const newFriendRelation = await Friend.findOne({
    user: fakeUser.id,
  }).populate("friends");
  expect(newFriendRelation!.friends.length).toBe(1);
  const remainingFriend = newFriendRelation!.friends[0] as UserDocument;
  expect(remainingFriend.id).toEqual(fakeUserFriend1.id);
});
