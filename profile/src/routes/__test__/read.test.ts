/*
 * Created by Jimmy Lan
 * Creation Date: 2020-12-04
 */

import mongoose from "mongoose";
import request from "supertest";
import { UserRole } from "@ly-letitfly/common";

import { app } from "../../app";
import { Friend, User } from "../../models";

it("returns 401 if the user is not authenticated", async () => {
  await request(app).get("/api/profiles").send().expect(401);
});

it("returns 400 if the user is not found", async () => {
  const response1 = await request(app)
    .get("/api/profiles/data")
    .set("Cookie", global.getTestCookie())
    .send()
    .expect(400);

  const response2 = await request(app)
    .get("/api/profiles/5fc9c18a41911f00230bdcb3/data")
    .set("Cookie", global.getTestCookie())
    .send()
    .expect(400);

  expect(response1.body.success).toBeFalsy();
  expect(response2.body.success).toBeFalsy();
});

it("returns user information on valid requests", async () => {
  const fakeUser = {
    id: "5fc9c18a41911f00230bdcb3",
    email: "user@user.com",
    role: UserRole.user,
  };
  const user = User.build({
    id: fakeUser.id,
    personal: {
      dateOfBirth: new Date("2000-01-01"),
    },
    contact: {
      email: {
        primary: fakeUser.email,
      },
      telephone: "123-123-1234",
    },
  });
  await user.save();

  const response1 = await request(app)
    .get("/api/profiles/data")
    .set("Cookie", global.getTestCookie(fakeUser))
    .send()
    .expect(200);

  expect(response1.body.success).toBeTruthy();
  expect(response1.body.data.id).toEqual(fakeUser.id);
  expect(response1.body.data.personal.dateOfBirth).toEqual(
    "2000-01-01T00:00:00.000Z"
  );
  expect(response1.body.data.contact.email.primary).toEqual(fakeUser.email);
  expect(response1.body.data.contact.telephone).toEqual("123-123-1234");
});

it("returns 403 when user has insufficient permission to access data", async () => {
  const fakeUser = {
    id: "5fc9c18a41911f00230bdcb3",
    email: "user@user.com",
    role: UserRole.user,
  };
  const user = User.build({
    id: fakeUser.id,
    personal: {
      dateOfBirth: new Date("2000-01-01"),
    },
    contact: {
      email: {
        primary: fakeUser.email,
      },
      telephone: "123-123-1234",
    },
  });
  await user.save();

  const response1 = await request(app)
    .get("/api/profiles/5fca61c5f473a21229516c61/data")
    .set("Cookie", global.getTestCookie(fakeUser))
    .send()
    .expect(403);

  expect(response1.body.success).toBeFalsy();
});

it("allows information access between friends", async () => {
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

  const user = User.build({
    id: fakeUser.id,
    contact: {
      email: {
        primary: fakeUser.email,
      },
    },
  });
  await user.save();
  const friend = User.build({
    id: fakeUserFriend.id,
    personal: {
      dateOfBirth: new Date("2000-01-01"),
    },
    contact: {
      email: {
        primary: fakeUserFriend.email,
      },
      telephone: "123-123-1234",
    },
  });
  await friend.save();

  const friendRelation = Friend.build({
    user: fakeUser.id,
    friends: [fakeUserFriend.id],
  });
  await friendRelation.save();

  const response = await request(app)
    .get("/api/profiles/" + fakeUserFriend.id + "/data")
    .set("Cookie", global.getTestCookie(fakeUser))
    .send()
    .expect(200);

  expect(response.body.success).toBeTruthy();
  expect(response.body.data.contact.email.primary).toEqual(
    fakeUserFriend.email
  );
  expect(response.body.data.contact.telephone).toEqual("123-123-1234");
});
