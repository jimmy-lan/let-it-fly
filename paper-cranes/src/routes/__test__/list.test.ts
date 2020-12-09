/*
 * Created by Jimmy Lan
 * Creation Date: 2020-12-07
 */

import request from "supertest";
import { app } from "../../app";
import { addFakeUser, addPaperCraneWithRecord, addPaperStyle } from "./helpers";

it("returns 401 when user is not authenticated", async () => {
  await request(app).get("/api/paper-cranes/sent").send({}).expect(401);
  await request(app).get("/api/paper-cranes/received").send({}).expect(401);
  await request(app).get("/api/paper-cranes/unread").send({}).expect(401);
  await request(app).get("/api/paper-cranes/starred").send({}).expect(401);
});

const populateUserAndPaperCranes = async () => {
  const user1 = await addFakeUser();
  const user2 = await addFakeUser();
  const user3 = await addFakeUser();

  await addPaperStyle(user1.id, "#ccc");
  await addPaperStyle(user2.id, "#ccc");
  await addPaperStyle(user3.id, "#ccc");

  await addPaperCraneWithRecord(
    user1.id,
    user2.id,
    "User 1 to 2",
    "content",
    "#ccc"
  );

  await addPaperCraneWithRecord(
    user2.id,
    user3.id,
    "User 2 to 3",
    "content",
    "#ccc"
  );

  await addPaperCraneWithRecord(
    user1.id,
    user3.id,
    "User 1 to 3",
    "content",
    "#ccc"
  );

  return [user1, user2, user3];
};

it("returns an empty list for sent if nothing is sent", async () => {
  const [user1, user2, user3] = await populateUserAndPaperCranes();

  const response = await request(app)
    .get("/api/paper-cranes/sent")
    .set("Cookie", global.getTestCookie(user3))
    .send()
    .expect(200);

  expect(response.body.success).toBeTruthy();
  expect(response.body.data.length).toBe(0);
});

it("returns an empty list for receive if nothing is received", async () => {
  const [user1, user2, user3] = await populateUserAndPaperCranes();

  const response = await request(app)
    .get("/api/paper-cranes/received")
    .set("Cookie", global.getTestCookie(user1))
    .send()
    .expect(200);

  expect(response.body.success).toBeTruthy();
  expect(response.body.data.length).toBe(0);
});

it("returns a list of sent paper crane", async () => {
  const [user1, user2, user3] = await populateUserAndPaperCranes();

  const response = await request(app)
    .get("/api/paper-cranes/sent")
    .set("Cookie", global.getTestCookie(user1))
    .send()
    .expect(200);

  expect(response.body.success).toBeTruthy();
  expect(response.body.data.length).toBe(2);
  expect(response.body.data[0].sender).not.toBeDefined();
  expect(response.body.data[0].receiver).not.toBeDefined();
  expect(response.body.data[0].id).toBeDefined();
  expect(response.body.data[0].title).toBeDefined();
  expect(response.body.data[0].style).toBeDefined();
});

it("returns a list of received paper crane", async () => {
  const [user1, user2, user3] = await populateUserAndPaperCranes();

  const response = await request(app)
    .get("/api/paper-cranes/received")
    .set("Cookie", global.getTestCookie(user3))
    .send()
    .expect(200);

  expect(response.body.success).toBeTruthy();
  expect(response.body.data.length).toBe(2);
  expect(response.body.data[0].sender).not.toBeDefined();
  expect(response.body.data[0].receiver).not.toBeDefined();
  expect(response.body.data[0].title).toBeDefined();
  expect(response.body.data[0].style).toBeDefined();
});

it("returns a list of unread paper crane", async () => {
  const [user1, user2, user3] = await populateUserAndPaperCranes();

  const response = await request(app)
    .get("/api/paper-cranes/unread")
    .set("Cookie", global.getTestCookie(user2))
    .send()
    .expect(200);

  expect(response.body.success).toBeTruthy();
  expect(response.body.data.length).toBe(0);
});

it("returns a list of starred paper crane", async () => {
  const [user1, user2, user3] = await populateUserAndPaperCranes();

  const paperCrane = await addPaperCraneWithRecord(
    user1.id,
    user2.id,
    "User 1 to 2 starred",
    "some content",
    "#ccc",
    false,
    true
  );

  const response1 = await request(app)
    .get("/api/paper-cranes/starred")
    .set("Cookie", global.getTestCookie(user1))
    .send()
    .expect(200);

  expect(response1.body.success).toBeTruthy();
  expect(response1.body.data).toBeDefined();
  expect(response1.body.data.length).toBe(1);
  expect(response1.body.data[0].id).toEqual(paperCrane.id);

  const response2 = await request(app)
    .get("/api/paper-cranes/starred")
    .set("Cookie", global.getTestCookie(user2))
    .send()
    .expect(200);
  expect(response2.body.success).toBeTruthy();
  expect(response2.body.data).toBeDefined();
  expect(response2.body.data.length).toBe(1);
  expect(response2.body.data[0].id).toEqual(paperCrane.id);
  expect(response2.body.data[0].title).toEqual(paperCrane.title);
});
