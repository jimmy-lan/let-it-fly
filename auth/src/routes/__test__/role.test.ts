/*
 * Created by Jimmy Lan
 * Creation Date: 2020-12-08
 */

import request from "supertest";
import mongoose from "mongoose";
import { UserRole } from "@ly-letitfly/common";
import { app } from "../../app";
import { User } from "../../models";

jest.mock("../../services/NatsWrapper");

it("returns 401 unauthorized if user is not authenticated", async () => {
  await request(app)
    .post("/api/users/roles/upgrade")
    .send({ firstName: "William", lastName: "Joyce" })
    .expect(401);
});

it("returns 400 bad request if user does not have the guest role", async () => {
  await request(app)
    .post("/api/users/roles/upgrade")
    .set(
      "Cookie",
      global.getTestCookie({
        id: mongoose.Types.ObjectId().toHexString(),
        email: "user@user.com",
        role: UserRole.user,
      })
    )
    .send({ firstName: "William", lastName: "Joyce" })
    .expect(400);
});

it("updates role of user on valid requests", async () => {
  const signUpResponse = await request(app)
    .post("/api/users/signup")
    .send({
      email: "user@user.com",
      password: "user",
    })
    .expect(201);

  const response = await request(app)
    .post("/api/users/roles/upgrade")
    .set(
      "Cookie",
      global.getTestCookie({
        id: signUpResponse.body.data.id,
        email: "user@user.com",
        role: UserRole.guest,
      })
    )
    .send({
      firstName: "William",
      lastName: "Joyce",
    })
    .expect(200);

  expect(response.body.success).toBeTruthy();
  expect(response.body.data).toBeDefined();

  const user = await User.findOne({ email: "user@user.com" });
  expect(user).toBeDefined();
  expect(user!.firstName).toEqual("William");
  expect(user!.lastName).toEqual("Joyce");
  expect(user!.role).toEqual(UserRole.user);
});
