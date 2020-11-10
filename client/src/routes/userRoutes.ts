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

import {
  AccountSettings,
  UserHome,
  SpaceInboxPage,
  SpaceSentPage,
  SpaceStarredPage,
  PaperCraneSpaceFrame,
  AdminHome,
  UserStore,
} from "../features";

import {
  ActivityTable,
  PaperCraneTable,
  StoreTable,
  UserTable,
} from "../features/adminPage";

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
        Component: PaperCraneSpaceFrame,
        isProtected: [UserRole.user],
        children: [
          {
            path: "/my/space/inbox",
            Component: SpaceInboxPage,
          },
          {
            path: "/my/space/sent",
            Component: SpaceSentPage,
          },
          {
            path: "/my/space/starred",
            Component: SpaceStarredPage,
          },
        ],
      },
      {
        path: "/my/store",
        Component: UserStore,
        isProtected: [UserRole.user],
      },
      {
        path: "/my",
        Component: AdminHome,
        exact: true,
        isProtected: [UserRole.admin],
      },
      {
        path: "/my/users-table",
        Component: UserTable,
        exact: true,
        isProtected: [UserRole.admin],
      },
      {
        path: "/my/store-table",
        Component: StoreTable,
        exact: true,
        isProtected: [UserRole.admin],
      },
      {
        path: "/my/log-table",
        Component: ActivityTable,
        exact: true,
        isProtected: [UserRole.admin],
      },
      {
        path: "/my/cranes-table",
        Component: PaperCraneTable,
        exact: true,
        isProtected: [UserRole.admin],
      },
    ],
  },
];
