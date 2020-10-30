/**
 * Created by Jimmy Lan
 * Creation Date: 2020-10-30
 * Description: Public routes visible to everyone.
 */
import { RouteEntry } from "./models";
import { Home } from "../features/Home";

export const publicRoutes: RouteEntry[] = [
  {
    path: "/",
    exact: true,
    Component: Home,
  },
];
