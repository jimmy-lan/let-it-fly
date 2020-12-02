/*
 * Created by Jimmy Lan
 * Creation Date: 2020-12-01
 */
import { MongoMemoryServer } from "mongodb-memory-server";
import mongoose from "mongoose";
import { JwtPayload, UserRole } from "../../../common/src/models";
import jwt from "jsonwebtoken";

let mongo: MongoMemoryServer;
beforeAll(async () => {
  process.env.JWT_SECRET = "asdfjkl;";
  // Stop NODE from complaining about self-signed certificates
  // during test.
  process.env.NODE_TLS_REJECT_UNAUTHORIZED = "0";

  mongo = new MongoMemoryServer();
  const mongoUri = await mongo.getUri();

  await mongoose.connect(mongoUri, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
  });
});

beforeEach(async () => {
  // @ts-ignore
  const collections = await mongoose.connection.db.collections();

  for (let collection of collections) {
    await collection.deleteMany();
  }
});

afterAll(async () => {
  await mongo.stop();
  await mongoose.connection.close();
});
