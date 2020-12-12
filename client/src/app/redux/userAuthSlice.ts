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
import { AppThunk } from "../store";
import { AxiosResponse } from "axios";

export interface UserState {
  email: string;
  error?: UserErrorObject;
  role?: UserRole;
  firstName?: string;
  lastName?: string;
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
  id: string;
  /**
   * If email is empty, the user may not be authenticated
   */
  email: string;
  role: UserRole;
  firstName: string;
  lastName: string;
}

const initialState: UserState = {
  email: "",
};

const userAuthSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    authenticate: (
      state: UserState,
      {
        payload: { email, role, firstName, lastName },
      }: PayloadAction<AuthPayload>
    ) => {
      state.email = email;
      state.role = role;
      state.firstName = firstName;
      state.lastName = lastName;
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
  let response: AxiosResponse<AuthResponse>;
  try {
    response = await authFunc(email, password);
  } catch (error) {
    handleServerError(dispatch, error);
    return error;
  }
  const body = response.data;
  if (body.success) {
    dispatch(clearError());
    dispatch(authenticate(body.data!));
  } else {
    if (body.errors) {
      dispatch(setError({ server: body.errors[0].message }));
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
