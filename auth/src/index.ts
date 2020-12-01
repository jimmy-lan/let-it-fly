/*
 * Created by Jimmy Lan
 * Creation Date: 2020-12-01
 */

import { verifyEnvVariables } from "@ly-letitfly/common";

const start = async () => {
  verifyEnvVariables(["JWT_SECRET", "MONGO_CONNECTION_URI"]);
};

start();
