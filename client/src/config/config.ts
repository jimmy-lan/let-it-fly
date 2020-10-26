/**
 * Created by Jimmy Lan
 * Creation Date: 2020-10-25
 */

export const config = {
  /**
   * If the user is unauthenticated and tries to access a protected route, the user
   * will be directed to this address.
   */
  unauthRedirectRoute: "/login",
};

export type Config = typeof config;
