/**
 * Created by Jimmy Lan
 * Creation Date: 2020-10-25
 * Description: Common server call helpers and structures
 */

/**
 * A common response coming back from the server.
 */
export interface ServerResponse {
  success: boolean;
  time?: string;
  data: object;
}

/**
 * Role of a user using the app.
 */
export enum UserRole {
  user = "user",
  admin = "admin",
}

/**
 * Utility function to fake a response from server.
 * @param response the response to be returned from the fake server.
 * @param seconds the number of seconds to resolve promise.
 */
export const getFakeServerCall = (response: ServerResponse, seconds: number) =>
  new Promise((resolve) => setTimeout(resolve, seconds * 1000, response));
