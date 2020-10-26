/**
 * Created by Jimmy Lan
 * Creation Date: 2020-10-26
 * Description: Routes that a user can use.
 */

import { RouteEntry } from "./index";
import { AppFrame } from "../common/components";

export const userRoutes: RouteEntry[] = [
  {
    path: "/",
    Component: AppFrame,
  },
];
