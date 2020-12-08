/*
 * Created by Jimmy Lan
 * Creation Date: 2020-12-01
 */

import express from "express";
import { json } from "body-parser";
import "express-async-errors";
import cookieSession from "cookie-session";

import {
  NotFoundError,
  handleErrors,
  extractUser,
  requireAuth,
} from "@ly-letitfly/common";
import { AccountSignUpMsgReceiver } from "./messages/receivers";
import { natsWrapper } from "./services";
// import * as routes from "./routes";

const app = express();

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
app.use(requireAuth);

// app.use("/api/users/property", Object.values(routes));

// Listeners
new AccountSignUpMsgReceiver(natsWrapper.client).listen();

app.all("*", () => {
  throw new NotFoundError();
});

app.use(handleErrors);

export { app };
