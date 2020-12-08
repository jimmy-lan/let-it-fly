/*
 * Created by Jimmy Lan
 * Creation Date: 2020-12-07
 */

import request from "supertest";
import { app } from "../../app";
import { addFakeUser, addPaperStyle } from "./helpers";
import { PaperCrane, PaperCraneRecord, UserDocument } from "../../models";

it("returns 401 when user is not authenticated", async () => {
  await request(app).post("/api/paper-cranes").send({}).expect(401);
});

it("responds with 400 bad request if no request body is provided", async () => {
  const fakeUser = await addFakeUser();

  const response = await request(app)
    .post("/api/paper-cranes")
    .set("Cookie", global.getTestCookie(fakeUser))
    .send({})
    .expect(400);

  expect(response.body.status).toBeFalsy();
});

it("responds with 400 bad request if style is missing", async () => {
  const fakeUser = await addFakeUser();

  const response = await request(app)
    .post("/api/paper-cranes")
    .set("Cookie", global.getTestCookie(fakeUser))
    .send({ title: "Good paper crane", content: "Some awesome content" })
    .expect(400);

  expect(response.body.status).toBeFalsy();
});

it("responds with 400 bad request if title is missing", async () => {
  const fakeUser = await addFakeUser();

  const response = await request(app)
    .post("/api/paper-cranes")
    .set("Cookie", global.getTestCookie(fakeUser))
    .send({ content: "hi", style: "#000" })
    .expect(400);

  expect(response.body.status).toBeFalsy();
});

it("responds with 400 bad request if title and content is empty", async () => {
  const fakeUser = await addFakeUser();

  const response = await request(app)
    .post("/api/paper-cranes")
    .set("Cookie", global.getTestCookie(fakeUser))
    .send({ title: "", content: "", style: "#000" })
    .expect(400);

  expect(response.body.status).toBeFalsy();
});

it("responds with 400 if user does not have the paper crane style provided", async () => {
  const fakeUser = await addFakeUser();
  await addPaperStyle(fakeUser.id, "#f5f5f5");

  const response = await request(app)
    .post("/api/paper-cranes")
    .set("Cookie", global.getTestCookie(fakeUser))
    .send({ title: "title", content: "hi", style: "#000" })
    .expect(400);

  expect(response.body.status).toBeFalsy();
});

it("creates a paper crane when request is valid", async () => {
  const fakeUser = await addFakeUser();
  await addPaperStyle(fakeUser.id, "#e5e5e5");

  const response = await request(app)
    .post("/api/paper-cranes")
    .set("Cookie", global.getTestCookie(fakeUser))
    .send({ title: "title", content: "hi", style: "#e5e5e5" })
    .expect(201);

  expect(response.body.success).toBeTruthy();
  expect(response.body.data.title).toEqual("title");
  expect(response.body.data.content).toEqual("hi");
  expect(response.body.data.style).toEqual("#e5e5e5");
  expect(response.body.data.id).toBeDefined();

  const paperCrane = await PaperCrane.findById(response.body.data.id).populate(
    "sender"
  );
  expect(paperCrane).toBeDefined();
  expect(paperCrane!.title).toEqual("title");
  expect(paperCrane!.content).toEqual("hi");
  expect(paperCrane!.senderId.toString()).toEqual(fakeUser.id);

  const paperCraneRecord = await PaperCraneRecord.findOne({
    userId: fakeUser.id,
  });
  expect(paperCraneRecord).toBeDefined();
});
