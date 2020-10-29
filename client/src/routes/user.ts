/**
 * Created by Jimmy Lan
 * Creation Date: 2020-10-26
 * Description: Routes that a user can use.
 */

import { RouteEntry } from "./index";
import { AppFrame } from "../common/components";
import { DummyText } from "../features/testComponent/DummyText";
import { UserRole } from "../services/serverApi";

export const userRoutes: RouteEntry[] = [
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
