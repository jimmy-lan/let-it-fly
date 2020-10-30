/**
 * Created by Jimmy Lan
 * Creation Date: 2020-10-26
 * Description: Routes that a user can use.
 */

import { RouteEntry } from './index';
import { AppFrame } from '../common/components';
import { UserRole } from '../services/serverApi';
import { Home, DummyText } from '../features';

export const userRoutes: RouteEntry[] = [
  {
    path: "/",
    Component: Home,
    isProtected: [UserRole.user],
  },
  {
    path: "/my",
    Component: AppFrame,
    children: [
      {
        path: "/my/dummy",
        Component: DummyText,
        exact: true,
      },
    ],
  },
];
