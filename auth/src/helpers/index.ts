/*
 * Created by Jimmy Lan
 * Creation Date: 2020-12-01
 */

import { Request } from "express";
import jwt from "jsonwebtoken";

export const generateJwtWithSession = (jwtBody: Object, req: Request) => {
  const userJwt = jwt.sign(jwtBody, process.env.JWT_SECRET!);

  req.session = {
    jwt: userJwt,
  };
};
