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
