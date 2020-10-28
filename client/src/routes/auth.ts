/**
 * Created by Jimmy Lan
 * Creation Date: 2020-10-26
 * Description: Routes for authentication.
 */

import { RouteEntry } from "./index";
import { SignIn, SignUp } from "../features";

export const authRoutes: RouteEntry[] = [
  {
    path: "/login",
    Component: SignIn,
  },
  {
    path: "/signup",
    Component: SignUp,
  },
];
