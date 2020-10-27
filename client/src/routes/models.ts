/**
 * Created by Jimmy Lan
 * Creation Date: 2020-10-27
 */

import { UserRole } from "../services/serverApi";
import { FunctionComponent } from "react";

/**
 * An entry in the route configuration object.
 */
export interface RouteEntry {
  /**
   * Path name to render the component
   */
  path: string;
  /**
   * Use exact route match. Defaults to false.
   */
  exact?: boolean;
  /**
   * Use route protection so that this route is only exposed to users
   * with the specified roles. If set to undefined, no route protection
   * is enabled. Defaults to undefined.
   */
  isProtected?: UserRole[] | undefined;
  /**
   * Url to redirect user if the user is not authenticated.
   * Defaults to undefined, where the redirect url in config object will
   * be used. Ignored if isProtected is false.
   */
  redirectUrl?: string;
  /**
   * The component to render in this route.
   */
  Component: FunctionComponent<any>;
  /**
   * Children routes for this route. Children routes should
   * only be specified when the rendering of children depends
   * on the rendering of parent.
   */
  children?: RouteEntry[];
}
