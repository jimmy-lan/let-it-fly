/*
 * Created by Jimmy Lan
 * Creation Date: 2020-12-01
 */

import { UserRole } from "./UserRole";

export interface JwtPayload {
  id: string;
  email: string;
  role: UserRole;
}
