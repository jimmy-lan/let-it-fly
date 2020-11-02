/**
 * Created by Jimmy Lan
 * Creation Date: 2020-10-25
 * Description:
 *    Slice managing general user information for route protection
 *    and rendering purposes.
 */

import {
  createSlice,
  PayloadAction,
  ThunkDispatch,
  Action,
  CombinedState,
} from "@reduxjs/toolkit";
import { UserRole } from "../../services/serverApi";
import {
  AuthResponse,
  signIn as signInRequest,
  signUp as signUpRequest,
  signOut as signOutRequest,
} from "../../services/serverApi";
import { AppThunk } from "../../app/store";

export interface UserState {
  /** If token is empty, user is not authenticated */
  token: string;
  email: string;
  error?: UserErrorObject;
  role?: UserRole;
  avatarLink?: string;
  coins?: number;
}

export interface UserErrorObject {
  /**
   * Error coming from server
   */
  server?: string;
  /**
   * Error coming from client-side validation
   */
  validation?: {
    emailField?: string;
    passwordField?: string;
    confirmPasswordField?: string;
    agreementField?: string;
  };
}

export interface AuthPayload {
  token: string;
  email: string;
  role: UserRole;
  avatarLink: string;
  coins: number;
}

const initialState: UserState = {
  token: "",
  email: "",
};

const userAuthSlice = createSlice({
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
    changeEmail: (state: UserState, { payload }: PayloadAction<string>) => {
      state.email = payload;
    },
    signOut: (state: UserState) => {
      return initialState;
    },
    setError: (
      state: UserState,
      { payload }: PayloadAction<UserErrorObject>
    ) => {
      state.error = payload;
    },
    clearError: (state: UserState) => {
      delete state.error;
    },
  },
});

export const {
  authenticate,
  changeEmail,
  setError,
  clearError,
  signOut,
} = userAuthSlice.actions;

const handleServerError = (
  dispatch: ThunkDispatch<CombinedState<unknown>, unknown, Action<string>>,
  error: string
) => {
  console.error(error);
  dispatch(
    setError({ server: "Sorry, we cannot handle your request right now." })
  );
};

export const authenticateAsync = (
  email: string,
  password: string,
  authFunc: typeof signInRequest | typeof signUpRequest
): AppThunk => async (dispatch) => {
  let response: AuthResponse;
  try {
    response = await authFunc(email, password);
  } catch (error) {
    handleServerError(dispatch, error);
    return error;
  }
  if (response.success) {
    dispatch(clearError());
    dispatch(authenticate(response.data!));
  } else {
    if (response.errorMessage) {
      dispatch(setError({ server: response.errorMessage }));
    } else {
      dispatch(
        setError({
          server: "Authentication not successful due to unknown error.",
        })
      );
    }
  }
};

export const signOutAsync = (): AppThunk => async (dispatch) => {
  try {
    await signOutRequest();
  } catch (error) {
    handleServerError(dispatch, error);
    return;
  }

  dispatch(signOut());
};

export default userAuthSlice.reducer;
