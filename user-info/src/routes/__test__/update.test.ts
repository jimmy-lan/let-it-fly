/*
 * Created by Jimmy Lan
 * Creation Date: 2020-12-04
 */

import request from "supertest";
import { app } from "../../app";
import { UserRole } from "@ly-letitfly/common";
import { User } from "../../models";

it("returns 401 failure response when not authenticated", async () => {
  const response = await request(app)
    .patch("/api/users/info")
    .send({})
    .expect(401);

  expect(response.body.success).toBeFalsy();
});

it("returns 401 failure response when not authenticated", async () => {
  const response = await request(app)
    .patch("/api/users/info/5fc9c18a41911f00230bdcb3")
    .send({})
    .expect(401);

  expect(response.body.success).toBeFalsy();
});

it("responds with 400 bad request when first name is not valid", async () => {
  const response = await request(app)
    .patch("/api/users/info")
    .set("Cookie", global.getTestCookie())
    .send({
      personal: {
        name: {
          first: "",
        },
      },
    })
    .expect(400);

  expect(response.body.success).toBeFalsy();
});

it("responds with 400 bad request when last name is not valid", async () => {
  const response = await request(app)
    .patch("/api/users/info")
    .set("Cookie", global.getTestCookie())
    .send({
      personal: {
        name: {
          last: "",
        },
      },
    })
    .expect(400);

  expect(response.body.success).toBeFalsy();
});

it("responds with 400 bad request when name is not valid", async () => {
  const response = await request(app)
    .patch("/api/users/info")
    .set("Cookie", global.getTestCookie())
    .send({
      personal: {
        name: {
          first: "",
          name: "",
        },
      },
    })
    .expect(400);

  expect(response.body.success).toBeFalsy();
});

it("responds with 400 bad request when user is not found", async () => {
  const response = await request(app)
    .patch("/api/users/info")
    .set("Cookie", global.getTestCookie())
    .send({})
    .expect(400);

  expect(response.body.success).toBeFalsy();
});

it("handles valid update user request", async () => {
  const user = User.build({
    id: "5fc9c18a41911f00230bdcb3",
    contact: { email: { primary: "a1@b.com" } },
  });
  await user.save();

  const response = await request(app)
    .patch("/api/users/info")
    .set(
      "Cookie",
      global.getTestCookie({
        id: "5fc9c18a41911f00230bdcb3",
        email: "a1@b.com",
        role: UserRole.user,
      })
    )
    .send({
      personal: {
        name: {
          first: "Jimmy",
          last: "Lan",
        },
        city: "Toronto",
        region: "Ontario",
      },
      contact: {
        email: {
          secondary: "c@d.com",
        },
        telephone: "123-456-7899",
        other: {
          github: "https://github.com/testing",
        },
      },
      profile: {
        interests: ["Ski", "Have fun", "Coding"],
      },
    })
    .expect(200);

  expect(response.body.success).toBeTruthy();
  const updatedUser = await User.findById("5fc9c18a41911f00230bdcb3");
  expect(updatedUser).toBeDefined();
  expect(updatedUser?.personal.name.first).toEqual("Jimmy");
  expect(updatedUser?.personal.name.last).toEqual("Lan");
  expect(updatedUser?.personal.city).toEqual("Toronto");
  expect(updatedUser?.personal.region).toEqual("Ontario");
  expect(updatedUser?.contact.email.secondary).toEqual("c@d.com");
  expect(updatedUser?.contact.other.github).toEqual(
    "https://github.com/testing"
  );
  expect(updatedUser?.contact.telephone).toEqual("123-456-7899");
  expect(updatedUser?.profile?.interests).toHaveLength(3);
});

it("handles valid update user request while ignoring irrelevant fields", async () => {
  const user = User.build({
    id: "5fc9c18a41911f00230bdcb3",
    contact: { email: { primary: "a1@b.com" } },
  });
  await user.save();

  const response = await request(app)
    .patch("/api/users/info")
    .set(
      "Cookie",
      global.getTestCookie({
        id: "5fc9c18a41911f00230bdcb3",
        email: "a1@b.com",
        role: UserRole.user,
      })
    )
    .send({
      // should be ignored
      _id: "dkslfjadsklfd;a",
      // should be ignored
      id: "fjaodslfjdasklf;aafda/adfae",
      personal: {
        city: "Toronto",
        region: "Ontario",
        dateOfBirth: "1970-01-01",
      },
      contact: {
        email: {
          // should be ignored
          primary: "jfldasfal@ajfkalsdfj.com",
          secondary: "c@d.com",
        },
        telephone: "123-456-7899",
        other: {
          github: "https://github.com/testing",
        },
      },
      profile: {
        description: "Hello world!",
      },
      // should be ignored
      dateJoined: "2000-11-01",
    })
    .expect(200);

  expect(response.body.success).toBeTruthy();
  const updatedUser = await User.findById("5fc9c18a41911f00230bdcb3");
  expect(updatedUser).toBeDefined();
  expect(updatedUser?.personal.dateOfBirth).toBeDefined();
  expect(updatedUser?.personal.city).toEqual("Toronto");
  expect(updatedUser?.personal.region).toEqual("Ontario");
  expect(updatedUser?.contact.email.primary).toEqual("a1@b.com");
  expect(updatedUser?.contact.email.secondary).toEqual("c@d.com");
  expect(updatedUser?.contact.other.github).toEqual(
    "https://github.com/testing"
  );
  expect(updatedUser?.contact.telephone).toEqual("123-456-7899");
  expect(updatedUser?.profile?.description).toEqual("Hello world!");
  expect(updatedUser?.dateJoined.getFullYear()).not.toEqual(2000);
  expect(updatedUser?.id).not.toEqual("dkslfjadsklfd;a");
});
