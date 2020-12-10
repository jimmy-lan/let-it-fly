/*
 * Created by Jimmy Lan
 * Creation Date: 2020-12-02
 * Description:
 *     A message receiver listening to a particular type
 *     of message through NATS streaming.
 */

import { Message as NatsMessage, Stan } from "node-nats-streaming";

import { Message } from "../messages";

export abstract class MsgReceiver<T extends Message> {
  abstract subject: T["subject"];
  abstract queueGroup: string;
  abstract onMessage(data: T["data"], msg: NatsMessage): void;

  /**
   * Number of milliseconds that a microservice needs to
   * acknowledge a message before retrying.
   * @protected
   */
  protected ackWait: number = 10 * 1000;

  constructor(protected client: Stan) {}

  get subscriptionOptions() {
    return this.client
      .subscriptionOptions()
      .setDeliverAllAvailable()
      .setManualAckMode(true)
      .setAckWait(this.ackWait)
      .setDurableName(this.queueGroup);
  }

  parseMsg = (msg: NatsMessage) => {
    const data = msg.getData();
    return typeof data === "string"
      ? JSON.parse(data)
      : JSON.parse(data.toString("utf8"));
  };

  listen = () => {
    const subscription = this.client.subscribe(
      this.subject,
      this.queueGroup,
      this.subscriptionOptions
    );

    subscription.on("message", (msg: NatsMessage) => {
      const data = this.parseMsg(msg);
      this.onMessage(data, msg);
    });
  };
}
