/**
 * Created by Jimmy Lan
 * Creation Date: 2020-10-26
 * Description: Routes that an admin can use
 */

import { AppFrame } from '../common';
import { DummyText, Home } from '../features';
import AdminHome from '../features/AdminHome/AdminHome';
import PaperCraneTable from '../features/adminPage/PaperCraneTable';
import UserTable1 from '../features/adminPage/UserTable1';
import StoreTable from '../features/adminPage/StoreTable';
import ActivityTable from '../features/adminPage/ActivityTable';
import { UserRole } from '../services/serverApi';
import { RouteEntry } from './index';

export const adminRoutes: RouteEntry[] = [
  {
    path: '/',
    Component: Home,
    isProtected: [UserRole.admin],
  },
  {
    path: '/my',
    Component: AppFrame,
    children: [
      {
        path: '/my',
        Component: AdminHome,
        exact: true,
      },
      {
        path: '/my/usersTable',
        Component: UserTable1,
        exact: true,
      },
      {
        path: '/my/storeTable',
        Component: StoreTable,
        exact: true,
      },
      {
        path: '/my/logTable',
        Component: ActivityTable,
        exact: true,
      },
      {
        path: '/my/cranesTable',
        Component: PaperCraneTable,
        exact: true,
      },
    ],
  },
];
