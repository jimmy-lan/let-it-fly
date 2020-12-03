/*
 * Created by Jimmy Lan
 * Creation Date: 2020-12-01
 */

import request from "supertest";
import { app } from "../../app";
import { UserRole } from "@ly-letitfly/common";

it("returns 401 failure if no user is authenticated", async () => {
  const response = await request(app)
    .get("/api/users/current")
    .send()
    .expect(401);

  expect(response.body).toHaveProperty("success");
  expect(response.body.success).toBeFalsy();
});

it("returns details of the current user when an authenticated user is present", async () => {
  const fakeUser = {
    id: "jfwieofdjs",
    email: "currentUserTest@domain.com",
    role: UserRole.user,
  };

  const response = await request(app)
    .get("/api/users/current")
    .set("Cookie", global.getTestCookie(fakeUser))
    .send()
    .expect(200);

  expect(response.body).toHaveProperty("success");
  expect(response.body).toHaveProperty("data");
  expect(response.body.data.email).toEqual("currentUserTest@domain.com");
  expect(response.body.data.role).toEqual(UserRole.user);
});
