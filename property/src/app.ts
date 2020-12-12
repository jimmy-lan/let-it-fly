/*
 * Created by Jimmy Lan
 * Creation Date: 2020-12-01
 */

import express from "express";
import { json } from "body-parser";
import "express-async-errors";
import cookieSession from "cookie-session";
import cors from "cors";

import {
  NotFoundError,
  handleErrors,
  extractUser,
  disallowGuest,
} from "@ly-letitfly/common";
import * as routes from "./routes";

const app = express();

// @ts-ignore
app.use(cors({ origin: true, credentials: true }));

app.set("trust proxy", true);
app.use(json());
app.use(
  cookieSession({
    signed: false,
    secure: process.env.NODE_ENV !== "test",
  })
);

// All routes in this service requires authentication
app.use(extractUser);
app.use(disallowGuest);

app.use("/api/property", Object.values(routes));

app.all("*", () => {
  throw new NotFoundError();
});

app.use(handleErrors);

export { app };
