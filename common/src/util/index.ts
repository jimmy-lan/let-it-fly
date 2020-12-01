/*
 * Created by Jimmy Lan
 * Creation Date: 2020-12-01
 */

import jwt from "jsonwebtoken";
import { JwtPayload, UserRole } from "../models";

/**
 * Verify whether environmental variables with name <variables> are
 * present. If not, throw an error to halt program execution.
 * @param variables
 */
export const verifyEnvVariables = (variables: string[]) => {
  for (let variable of variables) {
    if (!process.env[variable]) {
      throw new Error(`Environmental variable ${variable} must be defined!`);
    }
  }
};

declare global {
  namespace NodeJS {
    interface Global {
      getTestCookie: () => string[];
    }
  }
}

/**
 * Obtain encoded test cookies array used to pass into set cookie
 * statement supplied by supertest.
 */
global.getTestCookie = (payload?: JwtPayload) => {
  const data = payload
    ? payload
    : {
        id: "jfwieofdjs",
        email: "user@user.com",
        role: UserRole.user,
      };

  const token = jwt.sign(data, process.env.JWT_KEY!);
  const sessionJson = JSON.stringify({ jwt: token });
  const base64String = Buffer.from(sessionJson).toString("hex");
  return [`express:sess=${base64String}`];
};
