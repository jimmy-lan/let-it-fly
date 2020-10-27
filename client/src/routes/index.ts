/**
 * Created by Jimmy Lan
 * Creation Date: 2020-10-26
 */

import { userRoutes } from "./user";
import { adminRoutes } from "./admin";
import { authRoutes } from "./auth";
import { RouteEntry } from "./models";

const routes: RouteEntry[] = [...authRoutes, ...userRoutes, ...adminRoutes];
export { routes };

export * from "./models";
