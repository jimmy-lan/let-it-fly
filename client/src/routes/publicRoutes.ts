/**
 * Created by Jimmy Lan
 * Creation Date: 2020-10-30
 * Description: Public routes visible to everyone.
 */
import { RouteEntry } from "./models";
import { AppHome } from "../features/AppHome";

export const publicRoutes: RouteEntry[] = [
  {
    path: "/",
    exact: true,
    Component: AppHome,
  },
];
