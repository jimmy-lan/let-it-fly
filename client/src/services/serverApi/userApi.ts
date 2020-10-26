/**
 * Created by Jimmy Lan
 * Creation Date: 2020-10-25
 * Description: Server APIs for user-related queries
 */
import { getFakeServerCall } from "./helpers";
import { ServerResponse, UserRole } from "../../models";

/**
 * A response returned from sign in or sign up actions
 */
export interface AuthResponse extends ServerResponse {
  data: {
    token: string;
    email: string;
    role: UserRole;
    avatarLink: string;
    coins: number;
  };
}

/**
 * A fake token generated with "sub" equal to "user@user.com"
 */
const fakeToken =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiJ1c2VyQHVzZXIuY29tIiwibmFtZSI6IldpbGxpYW0gSm95Y2UiLCJpYXQiOjE1MTYyMzkwMjJ9.gSBKHwOWcwi3Lgz_ONbckfnf83Jv1tGi9XFvjqbuaBA";

/**
 * Send sign in request to server
 * @param email user email
 * @param password user password
 */
export const signIn = (email: string, password: string) => {
  const response: AuthResponse = {
    success: true,
    data: {
      token: fakeToken,
      email,
      role: email === "admin@admin.com" ? UserRole.admin : UserRole.user,
      avatarLink: "https://via.placeholder.com/150/0000FF/808080?Text=User",
      coins: 1000,
    },
  };
  return getFakeServerCall(response, 0.5);
};

/**
 * Send sign up request to server
 * @param email user email
 * @param password user password
 */
export const signUp = (email: string, password: string) => {
  const response: AuthResponse = {
    success: true,
    data: {
      token: fakeToken,
      email,
      role: email === "admin@admin.com" ? UserRole.admin : UserRole.user,
      avatarLink: "https://via.placeholder.com/150/0000FF/808080?Text=User",
      coins: 1000,
    },
  };
  return getFakeServerCall(response, 0.5);
};

/**
 * Send request password request to server
 * @param email user email
 */
export const requestPassword = (email: string) => {
  const response: ServerResponse = {
    success: true,
  };
  return getFakeServerCall(response, 0.5);
};

/**
 * Send sign out request to server. Using cookie-based authentication,
 * this function should not require any parameters.
 */
export const signOut = () => {
  const response: ServerResponse = {
    success: true,
  };
  return getFakeServerCall(response, 0.5);
};
