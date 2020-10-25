/**
 * Created by Jimmy Lan
 * Creation Date: 2020-10-25
 * Description: Server APIs for user-related queries
 */
import { getFakeServerCall } from "./helpers";
import { UserRole } from "../models";

export const login = () => {
  return getFakeServerCall(
    { success: true, data: { email: "user@user.com", role: UserRole.user } },
    0.5
  );
};
