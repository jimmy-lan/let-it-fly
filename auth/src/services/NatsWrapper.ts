/*
 * Created by Jimmy Lan
 * Creation Date: 2020-12-02
 * Description: Singleton NATS connection class.
 */

import nats, { Stan, StanOptions } from "node-nats-streaming";

class NatsWrapper {
  private _client?: Stan;
  private static _instance?: NatsWrapper;

  static get = () => {
    if (!NatsWrapper._instance) {
      NatsWrapper._instance = new NatsWrapper();
    }
    return NatsWrapper._instance;
  };

  get client() {
    if (!this._client) {
      throw new Error(
        "NATS client accessed before connection. Call 'connect' first before obtaining the client."
      );
    }
    return this._client;
  }

  connect = (clusterID: string, clientID: string, opts?: StanOptions) => {
    this._client = nats.connect(clusterID, clientID, opts);

    return new Promise<void>((resolve, reject) => {
      this._client!.on("connect", () => {
        console.log("Connected to NATS.");
        resolve();
      });
      this._client!.on("error", (error) => {
        console.error("Failed to connect to NATS.");
        reject(error);
      });
    });
  };
}

export const natsWrapper = NatsWrapper.get();
