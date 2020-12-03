/*
 * Created by Jimmy Lan
 * Creation Date: 2020-12-01
 */

import mongoose from "mongoose";
import { verifyEnvVariables } from "@ly-letitfly/common";
import { app } from "./app";
import { NatsWrapper } from "./NatsWrapper";

const start = async () => {
  verifyEnvVariables(["JWT_SECRET", "MONGO_CONNECTION_URI"]);

  try {
    // Connect to nats
    await NatsWrapper.getInstance().connect("letitfly", "auth", {
      url: "http://nats-service:4222",
    });

    // Connect to mongodb
    await mongoose.connect(process.env.MONGO_CONNECTION_URI!, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useCreateIndex: true,
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
