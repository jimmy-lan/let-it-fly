/**
 * Created by Jimmy Lan
 * Creation Date: 2020-10-26
 * Description:
 *    Hook to return routes that are suitable for the current user.
 * Warning:
 *    Do not use this hook in SSR!
 */

import Cookies from "js-cookie";

import { RouteEntry } from "../../routes";
import { store } from "../../app/store";

export const useRoutes = (routes: RouteEntry[]) => {
  const currentUser = store.getState().userAuth;
  const cookie = Cookies.get("express:sess");

  // if currentUser is authenticated
  if (cookie) {
    // return routes that are relevant to the role.
    return routes.filter((route: RouteEntry) => {
      if (route.isProtected) {
        // when user is authenticated, role must be defined.
        // safely suppress error
        return route.isProtected.includes(currentUser.role!);
      } else {
        return true;
      }
    });
  }
  return routes;
};
