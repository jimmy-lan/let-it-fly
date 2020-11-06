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
import { UserHome, AccountSettings } from "../features";
import { AdminHome } from "../features/AdminHome2";
import PaperCraneTable from "../features/adminPage/PaperCraneTable";
import UserTable from "../features/adminPage/UserTable";
import StoreTable from "../features/adminPage/StoreTable";
import ActivityTable from "../features/adminPage/ActivityTable";
import { SignIn } from "../features/authentication/SignIn";


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
        {path: "/my",
        Component: AdminHome,
        exact: true,
        isProtected: [UserRole.admin],
      },
      {
        path: "/my/usersTable",
        Component: UserTable,
        exact: true,
      },
      {
        path: "/my/storeTable",
        Component: StoreTable,
        exact: true,
      },
      {
        path: "/my/logTable",
        Component: ActivityTable,
        exact: true,
      },
      {
        path: "/my/cranesTable",
        Component: PaperCraneTable,
        exact: true,
      },
    ],
  },
];
