/**
 * Created by Jimmy Lan
 * Creation Date: 2020-10-25
 * Description: Server APIs for user-related queries
 */
import { getFakeServerCall } from "./helpers";
import { ServerResponse, UserRole } from "../models";

/**
 * A response returned from sign in or sign up actions
 */
export interface AuthenticationResponse extends ServerResponse {
  data: {
    email: string;
    role: UserRole;
    avatarLink: string;
    coins: number;
  };
}

export const signIn = (email: string, password: string) => {
  const response: AuthenticationResponse = {
    success: true,
    data: {
      email: email,
      role: email === "admin@admin.com" ? UserRole.admin : UserRole.user,
      avatarLink: "https://via.placeholder.com/150/0000FF/808080?Text=User",
      coins: 1000,
    },
  };
  return getFakeServerCall(response, 0.5);
};
