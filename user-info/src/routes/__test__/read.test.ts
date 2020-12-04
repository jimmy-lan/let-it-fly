/*
 * Created by Jimmy Lan
 * Creation Date: 2020-12-04
 */

import request from "supertest";
import { app } from "../../app";
import { UserRole } from "@ly-letitfly/common";
import { User } from "../../models";

it("returns 401 if the user is not authenticated", async () => {
  await request(app).get("/api/users/info").send().expect(401);
});

it("returns 400 if the user is not found", async () => {
  const response1 = await request(app)
    .get("/api/users/info")
    .set("Cookie", global.getTestCookie())
    .send()
    .expect(400);

  const response2 = await request(app)
    .get("/api/users/info/5fc9c18a41911f00230bdcb3")
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
    _id: fakeUser.id,
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
    .get("/api/users/info")
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
    _id: fakeUser.id,
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
    .get("/api/users/info/5fca61c5f473a21229516c61")
    .set("Cookie", global.getTestCookie(fakeUser))
    .send()
    .expect(403);

  expect(response1.body.success).toBeFalsy();
});
