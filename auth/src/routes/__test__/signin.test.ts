/*
 * Created by Jimmy Lan
 * Creation Date: 2020-12-01
 */

import request from "supertest";
import { app } from "../../app";
import { UserRole } from "@ly-letitfly/common";
import { natsWrapper } from "../../services";

jest.mock("../../services/NatsWrapper");

it("returns 400 failure response when invalid email is provided", async () => {
  const response = await request(app)
    .post("/api/users/signin")
    .send({
      email: "root@doesnotexist.com",
      password: "password!",
    })
    .expect(400);

  expect(response.body.success).toBeFalsy();
});

it("returns 400 failure response when invalid password is provided", async () => {
  await request(app)
    .post("/api/users/signup")
    .send({
      email: "root@doesnotexist.com",
      password: "jfwe9qfods",
    })
    .expect(201);

  const response2 = await request(app)
    .post("/api/users/signin")
    .send({
      email: "root@doesnotexist.com",
      password: "password!",
    })
    .expect(400);

  expect(response2.body.success).toBeFalsy();
});

it("sets a cookie when successfully signed in", async () => {
  await request(app)
    .post("/api/users/signup")
    .send({
      email: "root@doesnotexist.com",
      password: "jfwe9qfods",
    })
    .expect(201);

  const response2 = await request(app)
    .post("/api/users/signin")
    .send({
      email: "root@doesnotexist.com",
      password: "jfwe9qfods",
    })
    .expect(200);

  expect(response2.body.success).toBeTruthy();
  expect(response2.get("Set-Cookie")).toBeDefined();
});

it("returns some user information when successfully signed in", async () => {
  const email = "root@doesnotexist.com";
  const password = "jfwe9qfods";

  await request(app)
    .post("/api/users/signup")
    .send({
      email,
      password,
    })
    .expect(201);

  const response2 = await request(app)
    .post("/api/users/signin")
    .send({
      email,
      password,
    })
    .expect(200);

  expect(response2.body.success).toBeTruthy();
  expect(response2.body.data).toBeDefined();
  expect(response2.body.data.email).toEqual(email);
  expect(response2.body.data.password).not.toBeDefined();
  expect(response2.body.data.role).toEqual(UserRole.guest);
});

it("returns response with status 400 on bad requests", async () => {
  const response1 = await request(app)
    .post("/api/users/signin")
    .send({
      email: "helloworld",
      password: "hithere",
    })
    .expect(400);

  expect(response1.body.success).toBeFalsy();

  const response2 = await request(app)
    .post("/api/users/signin")
    .send({
      password: "hithere",
    })
    .expect(400);

  expect(response2.body.success).toBeFalsy();

  const response3 = await request(app)
    .post("/api/users/signin")
    .send({
      email: "a@bcdef",
      password: "hithere",
    })
    .expect(400);

  expect(response3.body.success).toBeFalsy();

  const response4 = await request(app)
    .post("/api/users/signin")
    .send({
      email: "test@test.com",
      password: "",
    })
    .expect(400);

  expect(response4.body.success).toBeFalsy();

  const response5 = await request(app)
    .post("/api/users/signin")
    .send({})
    .expect(400);

  expect(response5.body.success).toBeFalsy();
});

it("sends a message when user successfully signs in", async () => {
  await request(app)
    .post("/api/users/signup")
    .send({
      email: "user@user.com",
      password: "user",
    })
    .expect(201);

  await request(app)
    .post("/api/users/signin")
    .send({
      email: "user@user.com",
      password: "user",
    })
    .expect(200);

  expect(natsWrapper.client.publish).toHaveBeenCalledTimes(2);
});
