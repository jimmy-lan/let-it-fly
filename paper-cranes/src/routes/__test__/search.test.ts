/*
 * Created by Jimmy Lan
 * Creation Date: 2020-12-07
 */

import request from "supertest";
import mongoose from "mongoose";
import { app } from "../../app";

it("returns 401 when user is not authenticated", async () => {
  await request(app).get("/api/paper-crane").send({}).expect(401);
});
