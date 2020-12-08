/*
 * Created by Jimmy Lan
 * Creation Date: 2020-12-07
 */

import mongoose from "mongoose";
import request from "supertest";
import { app } from "../../app";

it("returns 401 when user is not authenticated", async () => {
  await request(app).get("/api/paper-crane/sent").send({}).expect(401);
  await request(app).get("/api/paper-crane/received").send({}).expect(401);
  await request(app).get("/api/paper-crane/unread").send({}).expect(401);
});
