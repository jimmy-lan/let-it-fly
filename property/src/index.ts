/*
 * Created by Jimmy Lan
 * Creation Date: 2020-12-01
 */

import mongoose from "mongoose";
import { verifyEnvVariables } from "@ly-letitfly/common";
import { app } from "./app";
import { DataWorker, natsWrapper } from "./services";
import { AccountSignUpMsgReceiver } from "./messages/receivers";

const start = async () => {
  verifyEnvVariables([
    "JWT_SECRET",
    "MONGO_CONNECTION_URI",
    "NATS_CLUSTER_ID",
    "NATS_CLIENT_ID",
    "NATS_URL",
  ]);

  try {
    // Connect to nats
    await natsWrapper.connect(
      process.env.NATS_CLUSTER_ID!,
      process.env.NATS_CLIENT_ID!,
      {
        url: process.env.NATS_URL!,
      }
    );

    const natsClient = natsWrapper.client;
    natsClient.on("close", () => {
      console.warn("Connection to NATS is closed!");
      process.exit();
    });

    const onNatsClose = () => {
      natsClient.close();
      process.exit(1);
    };

    process.on("SIGINT", onNatsClose);
    process.on("SIGTERM", onNatsClose);

    // Listeners
    new AccountSignUpMsgReceiver(natsWrapper.client).listen();

    // Connect to mongodb
    await mongoose.connect(process.env.MONGO_CONNECTION_URI!, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useCreateIndex: true,
    });
    console.log("Connected to MongoDB.");

    // Ensure instance has proper data
    await DataWorker.onStart();
  } catch (error) {
    console.error(error);
  }

  const port = process.env.PORT || 3000;
  app.listen(port, () => {
    console.log(
      `Successfully initialized Property service (label=[property]) on port ${port}.`
    );
  });
};

start();
