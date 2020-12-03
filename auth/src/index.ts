/*
 * Created by Jimmy Lan
 * Creation Date: 2020-12-01
 */

import mongoose from "mongoose";
import { verifyEnvVariables } from "@ly-letitfly/common";
import { app } from "./app";
import { NatsWrapper } from "./services";

const start = async () => {
  verifyEnvVariables(["JWT_SECRET", "MONGO_CONNECTION_URI"]);

  try {
    // Connect to nats
    const natsWrapper = NatsWrapper.get();
    await natsWrapper.connect("letitfly", "auth", {
      url: "http://nats-service:4222",
    });

    const natsClient = natsWrapper.client;
    natsClient.on("close", () => {
      console.warn("Connection to NATS is closed!");
      process.exit();
    });

    process.on("SIGINT", () => natsClient.close());
    process.on("SIGTERM", () => natsClient.close());

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
