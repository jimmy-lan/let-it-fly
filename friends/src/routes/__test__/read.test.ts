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
  const friendRelation = Friend.build({ user: user.id, friends: [] });
  await friendRelation.save();

  const response = await request(app)
    .get("/api/friends")
    .set("Cookie", global.getTestCookie(fakeUser))
    .send()
    .expect(200);

  expect(response.body.success).toBeTruthy();
  expect(response.body.data.length).toEqual(0);
});

it("returns a list of friends on valid requests", async () => {
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
  const friend = User.build({
    id: fakeUserFriend.id,
    firstName: "Joe",
    lastName: "Williams",
  });
  await friend.save();
  const friendRelation = Friend.build({ user: user.id, friends: [friend] });
  await friendRelation.save();

  const response = await request(app)
    .get("/api/friends")
    .set("Cookie", global.getTestCookie(fakeUser))
    .send()
    .expect(200);

  expect(response.body.success).toBeTruthy();
  expect(response.body.data.length).toEqual(1);
  expect(response.body.data[0].id).toEqual(fakeUserFriend.id);
  expect(response.body.data[0].firstName).toEqual("Joe");
  expect(response.body.data[0].lastName).toEqual("Williams");
});

it("denies access if permission is insufficient", async () => {
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
  const friend = User.build({
    id: fakeUserFriend.id,
    firstName: "Joe",
    lastName: "Williams",
  });
  await friend.save();
  const friendRelation = Friend.build({ user: user.id, friends: [friend] });
  await friendRelation.save();

  const response = await request(app)
    .get("/api/friends/" + fakeUser.id)
    .set("Cookie", global.getTestCookie(fakeUserFriend))
    .send()
    .expect(403);

  expect(response.body.success).toBeFalsy();
});

it("allows admin access", async () => {
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
  const friend = User.build({
    id: fakeUserFriend.id,
    firstName: "Joe",
    lastName: "Williams",
  });
  await friend.save();
  const friendRelation = Friend.build({ user: user.id, friends: [friend] });
  await friendRelation.save();

  const response = await request(app)
    .get("/api/friends/" + fakeUser.id)
    .set(
      "Cookie",
      global.getTestCookie({
        id: mongoose.Types.ObjectId().toHexString(),
        email: "a@b.com",
        role: UserRole.admin,
      })
    )
    .send()
    .expect(200);

  expect(response.body.success).toBeTruthy();
  expect(response.body.data.length).toEqual(1);
  expect(response.body.data[0].id).toEqual(fakeUserFriend.id);
  expect(response.body.data[0].firstName).toEqual("Joe");
  expect(response.body.data[0].lastName).toEqual("Williams");
});
