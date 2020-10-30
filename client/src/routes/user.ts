/**
 * Created by Jimmy Lan
 * Creation Date: 2020-10-26
 * Description: Routes that a user can use.
 */

import { RouteEntry } from "./index";
import { AppFrame } from "../common/components";
import { UserRole } from "../services/serverApi";
import { Home, DummyText } from "../features";

export const userRoutes: RouteEntry[] = [
  {
    path: "/",
    exact: true,
    Component: Home,
  },
  {
    path: "/my",
    Component: AppFrame,
    isProtected: [UserRole.user],
    children: [
      {
        path: "/my",
        Component: DummyText,
        exact: true,
      },
    ],
  },
];
