/*
 * Created by Jimmy Lan
 * Creation Date: 2020-12-01
 */
import express from "express";
import { json } from "body-parser";
import "express-async-errors";
import cookieSession from "cookie-session";

import { , handleErrors } from "@ly-letitfly/common";

const app = express();

app.set("trust proxy", true);
app.use(json());
app.use(
  cookieSession({
    signed: false,
    secure: process.env.NODE_ENV !== "test",
  })
);

app.all("*", () => {
  throw new NotFoundError();
});

app.use(handleErrors);
