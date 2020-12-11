/**
 * Created by Jimmy Lan
 * Creation Date: 2020-10-25
 * Description: Common models module to use across the app.
 */

/**
 * A common response coming back from the server.
 */
export interface ServerResponse {
  success: boolean;
  /**
   * If request is successful, some data may be returned
   * from the server. This attribute will not be set if
   * request fails.
   */
  data?: any;
  /**
   * If request results in an error, success will be set
   * to false and some error message will be returned.
   */
  errors?: { message: string; cause?: string }[];
}

/**
 * Role of a user using the app.
 */
export enum UserRole {
  user = "user",
  admin = "admin",
  guest = "guest",
}
