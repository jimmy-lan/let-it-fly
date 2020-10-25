/**
 * Created by Jimmy Lan
 * Creation Date: 2020-10-25
 * Description:
 *    Slice managing general user information for route protection
 *    and rendering purposes.
 */

import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { UserRole } from "../models";
import {
  AuthResponse,
  signIn as signInRequest,
  signUp as signUpRequest,
} from "../serverApi";
import { AppThunk } from "../../app/store";

export interface UserState {
  /** If token is null or empty, user is not authenticated */
  token: string | null;
  error: string | null;
  email?: string;
  role?: UserRole;
  avatarLink?: string;
  coins?: number;
}

export interface AuthPayload {
  token: string;
  email: string;
  role: UserRole;
  avatarLink: string;
  coins: number;
}

const initialState: UserState = {
  token: null,
  error: null,
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    authenticate: (
      state: UserState,
      {
        payload: { token, email, role, avatarLink, coins },
      }: PayloadAction<AuthPayload>
    ) => {
      state.email = email;
      state.token = token;
      state.role = role;
      state.avatarLink = avatarLink;
      state.coins = coins;
    },
    setError: (
      state: UserState,
      { payload: { message } }: PayloadAction<{ message: string }>
    ) => {
      state.error = message;
    },
    clearError: (state: UserState) => {
      state.error = null;
    },
  },
});

export const { authenticate, setError, clearError } = userSlice.actions;

export const signInAsync = (
  email: string,
  password: string
): AppThunk => async (dispatch) => {
  try {
    const response: AuthResponse = await signInRequest(email, password);
    if (response.success) {
      dispatch(authenticate(response.data));
      dispatch(clearError());
    } else {
      if (response.errorMessage) {
        dispatch(setError({ message: response.errorMessage }));
      } else {
        dispatch(
          setError({
            message: "Authentication not successful due to unknown error.",
          })
        );
      }
    }
  } catch (error) {
    console.error(error);
    dispatch(
      setError({ message: "Sorry, we cannot handle your request right now." })
    );
  }
};

export default userSlice.reducer;
