/*
 * Created by Jimmy Lan
 * Creation Date: 2020-12-01
 */
import request from "supertest";
import { app } from "../../app";
import { UserRole } from "@ly-letitfly/common";
import { natsWrapper } from "../../services";

jest.mock("../../services/NatsWrapper");

it("returns response with status 201 when successful", async () => {
  const response = await request(app)
    .post("/api/users/signup")
    .send({
      email: "user@user.com",
      password: "user",
    })
    .expect(201);

  expect(response.body.success).toBeTruthy();
  expect(response.body.data.role).toEqual(UserRole.guest);
});

it("returns response with status 400 on bad requests", async () => {
  const response1 = await request(app)
    .post("/api/users/signup")
    .send({
      email: "@user.com",
      password: "user",
    })
    .expect(400);

  expect(response1.body.success).toBeFalsy();

  const response2 = await request(app)
    .post("/api/users/signup")
    .send({
      email: "user@user.com",
    })
    .expect(400);

  expect(response2.body.success).toBeFalsy();

  const response3 = await request(app)
    .post("/api/users/signup")
    .send({})
    .expect(400);

  expect(response3.body.success).toBeFalsy();
});

it("returns error when duplicate emails are present", async () => {
  const response1 = await request(app)
    .post("/api/users/signup")
    .send({
      email: "user@user.com",
      password: "user",
    })
    .expect(201);

  const response2 = await request(app)
    .post("/api/users/signup")
    .send({
      email: "user@user.com",
      password: "pass",
    })
    .expect(400);

  expect(response1.body.success).toBeTruthy();
  expect(response2.body.success).toBeFalsy();
});

it("sets cookie after successful signup", async () => {
  const response = await request(app)
    .post("/api/users/signup")
    .send({
      email: "admin@admin.com",
      password: "admin",
    })
    .expect(201);

  expect(response.body.success).toBeTruthy();
  expect(response.get("Set-Cookie")).toBeDefined();
});

it("sends a message when user successfully signs up", async () => {
  await request(app)
    .post("/api/users/signup")
    .send({
      email: "admin@admin.com",
      password: "admin",
    })
    .expect(201);

  expect(natsWrapper.client.publish).toHaveBeenCalledTimes(1);
});
