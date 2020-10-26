/**
 * Created by Jimmy Lan
 * Creation Date: 2020-10-25
 */

export const routeConfig = {
  /**
   * If the user is unauthenticated and tries to access a protected route, the user
   * will be directed to this address.
   */
  unauthRedirectRoute: "/login",
};

export type RouteConfig = typeof routeConfig;
