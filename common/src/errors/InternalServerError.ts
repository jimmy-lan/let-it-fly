/*
 * Created by Jimmy Lan
 * Creation Date: 2020-11-30
 */

import { HttpError } from "./HttpError";

export class InternalServerError extends HttpError {
  statusCode = 500;

  constructor(message?: string) {
    super("Internal server error" || message);

    Object.setPrototypeOf(this, InternalServerError.prototype);
  }

  serializeErrors() {
    return [{ message: "Internal server error" }];
  }
}
