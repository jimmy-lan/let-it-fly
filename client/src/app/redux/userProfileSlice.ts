/*
 * Created by Jimmy Lan
 * Creation Date: 2020-12-11
 */

import {
  createSlice,
  PayloadAction,
  ThunkDispatch,
  Action,
  CombinedState,
} from "@reduxjs/toolkit";

export interface ProfileState {
  profile: ProfilePayload;
  error?: ProfileErrorObject;
}

export interface ProfilePayload {
  personal?: {
    name?: {
      first: string;
      last: string;
    };
    dateOfBirth?: Date;
    city?: string;
    region?: string;
    occupation?: string;
  };
  contact: {
    email: {
      primary: string;
      secondary?: string;
    };
    telephone?: string;
    socialMedia?: {
      facebook?: string;
      linkedIn?: string;
      tweeter?: string;
      youtube?: string;
    };
    other?: {
      github?: string;
      website?: string;
    };
  };
  profile?: {
    description?: string;
    interests?: string[];
  };
  dateJoined?: Date;
}

export interface ProfileErrorObject {
  /**
   * Error coming from server
   */
  server?: string;
  /**
   * Error coming from client-side validation
   */
  validation?: {
    nameField?: string;
  };
}

const initialState: ProfileState = {
  profile: {
    contact: {
      email: {
        primary: "",
      },
    },
  },
};

const userProfileSlice = createSlice({
  name: "profile",
  initialState,
  reducers: {
    setError: (
      state: ProfileState,
      { payload }: PayloadAction<ProfileErrorObject>
    ) => {
      state.error = payload;
    },
    clearError: (state: ProfileState) => {
      delete state.error;
    },
  },
});

export const { setError, clearError } = userProfileSlice.actions;

const handleServerError = (
  dispatch: ThunkDispatch<CombinedState<unknown>, unknown, Action<string>>,
  error: string
) => {
  console.error(error);
  dispatch(
    setError({ server: "Sorry, we cannot handle your request right now." })
  );
};

export default userProfileSlice.reducer;
