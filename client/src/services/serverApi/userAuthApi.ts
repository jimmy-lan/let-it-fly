/**
 * Created by Jimmy Lan
 * Creation Date: 2020-10-25
 * Description: Server APIs for user-authentication related queries
 */
import { getFakeServerCall } from "./helpers";
import { ServerResponse, UserRole } from "./models";
import { axios } from "../axios";

/**
 * A response returned from sign in or sign up actions
 */
export interface AuthResponse extends ServerResponse {
  data?: {
    id: string;
    email: string;
    role: UserRole;
    firstName: string;
    lastName: string;
  };
}

/**
 * Send sign in request to server
 * @param email user email
 * @param password user password
 */
export const signIn = (email: string, password: string) => {
  return axios.post<AuthResponse>("/api/users/signin", { email, password });
};

/**
 * Send sign up request to server
 * @param email user email
 * @param password user password
 */
export const signUp = (email: string, password: string) => {
  return axios.post<AuthResponse>("/api/users/signup", { email, password });
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
  return axios.post<AuthResponse>("/api/signout");
};
