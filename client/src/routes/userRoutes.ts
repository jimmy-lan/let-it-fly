/**
 * Created by Jimmy Lan
 * Creation Date: 2020-10-30
 * Description:
 *    Routes that can only be seen by authenticated users.
 *    This includes regular user and admin.
 */
import { RouteEntry } from "./models";
import { AppFrame } from "../common/components/AppFrame";
import { UserRole } from "../services/serverApi";
import { AccountSettings, UserHome } from "../features";
import { PaperCraneSpace } from "../features/PaperCraneSpace";

export const userRoutes: RouteEntry[] = [
  {
    path: "/my",
    Component: AppFrame,
    isProtected: [UserRole.user, UserRole.admin],
    children: [
      {
        path: "/my",
        Component: UserHome,
        exact: true,
        isProtected: [UserRole.user],
      },
      {
        path: "/my/account",
        Component: AccountSettings,
      },
      {
        path: "/my/space",
        Component: PaperCraneSpace,
        isProtected: [UserRole.user],
      },
    ],
  },
];
