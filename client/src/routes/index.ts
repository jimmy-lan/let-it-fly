/**
 * Created by Jimmy Lan
 * Creation Date: 2020-10-26
 */

import { userRoutes } from "./userRoutes";
import { authRoutes } from "./authRoutes";
import { RouteEntry } from "./models";
import { publicRoutes } from "./publicRoutes";

export * from "./models";

const routes: RouteEntry[] = [...authRoutes, ...userRoutes, ...publicRoutes];
export { routes };
