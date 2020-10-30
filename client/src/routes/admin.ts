/**
 * Created by Jimmy Lan
 * Creation Date: 2020-10-26
 * Description: Routes that an admin can use
 */

import { AppFrame } from '../common';
import { DummyText, Home } from '../features';
import AdminHome from '../features/AdminHome/AdminHome';
import UserTable1 from '../features/adminPage/UserTable1';
import { UserRole } from '../services/serverApi';
import { RouteEntry } from './index';

export const adminRoutes: RouteEntry[] = [
  {
    path: '/',
    Component: Home,
  },
  {
    path: '/my',
    Component: AppFrame,
    isProtected: [UserRole.admin],
    children: [
      {
        path: '/my/usersTable',
        Component: UserTable1,
        exact: true,
      },
      {
        path: '/my/storeTable',
        Component: UserTable1,
        exact: true,
      },
      {
        path: '/my/logTable',
        Component: UserTable1,
        exact: true,
      },
      {
        path: '/my/cranesTable',
        Component: UserTable1,
        exact: true,
      },
      {
        path: '/my',
        Component: AdminHome,
        exact: true,
      },
    ],
  },
];
