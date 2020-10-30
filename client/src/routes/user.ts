/**
 * Created by Jimmy Lan
 * Creation Date: 2020-10-26
 * Description: Routes that a user can use.
 */

import { RouteEntry } from './index';
import { AppFrame } from '../common/components';
import UserTable1 from '../features/adminPage/UserTable1';
import { UserRole } from '../services/serverApi';
import { Home, DummyText } from '../features';

export const userRoutes: RouteEntry[] = [
  {
    path: '/',
    Component: AppFrame,
    isProtected: [UserRole.user],
    children: [
      {
        path: '/',
        Component: DummyText,
        exact: true,
      },
      {
        path: '/table',
        Component: UserTable1,
        exact: true,
      },
    ],
  },
];
