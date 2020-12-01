/*
 * Created by Jimmy Lan
 * Creation Date: 2020-12-01
 */

import mongoose from "mongoose";
import { verifyEnvVariables } from "@ly-letitfly/common";
import { app } from "./app";

const start = async () => {
  verifyEnvVariables(["JWT_SECRET", "MONGO_CONNECTION_URI"]);

  try {
    await mongoose.connect(process.env.MONGO_CONNECTION_URI!, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log("Connected to MongoDB.");
  } catch (error) {
    console.error(error);
  }

  const port = process.env.PORT || 3000;
  app.listen(port, () => {
    console.log(
      `Successfully initialized Auth service (label=[auth]) on port ${3000}.`
    );
  });
};

start();
