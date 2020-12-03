/*
 * Created by Jimmy Lan
 * Creation Date: 2020-12-02
 * Description: Singleton NATS connection class.
 */

import nats, { Stan, StanOptions } from "node-nats-streaming";

export class NatsWrapper {
  private _client?: Stan;
  private _instance?: NatsWrapper;

  getInstance = () => {
    if (!this._instance) {
      this._instance = new NatsWrapper();
    }
    return this._instance;
  };

  connect = (clusterID: string, clientID: string, opts?: StanOptions) => {
    this._client = nats.connect(clusterID, clientID, opts);

    return new Promise((resolve, reject) => {
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
