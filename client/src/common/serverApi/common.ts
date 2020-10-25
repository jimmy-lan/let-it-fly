/**
 * Created by Jimmy Lan
 * Creation Date: 2020-10-25
 * Description: Common server call helpers and structures
 */

import { ServerResponse } from "../models";

/**
 * Utility function to fake a response from server.
 * @param response the response to be returned from the fake server.
 * @param seconds the number of seconds to resolve promise.
 */
export const getFakeServerCall = (response: ServerResponse, seconds: number) =>
  new Promise((resolve) => setTimeout(resolve, seconds * 1000, response));
