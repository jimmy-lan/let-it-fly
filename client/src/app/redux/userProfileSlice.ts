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
import { AppThunk } from "../store";
import { AvatarResponse, fetchAvatar } from "../../services/serverApi";
import { AxiosResponse } from "axios";

export interface ProfileState {
  profile: ProfilePayload;
  error?: ProfileErrorObject;
}

export interface ProfilePayload {
  avatar?: string;
  personal?: {
    name?: {
      first?: string;
      last?: string;
    };
    dateOfBirth?: Date;
    city?: string;
    region?: string;
    occupation?: string;
  };
  contact?: {
    email?: {
      primary?: string;
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
    setProfile: (
      state: ProfileState,
      { payload }: PayloadAction<ProfilePayload>
    ) => {
      state.profile = payload;
    },
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

export const { setProfile, setError, clearError } = userProfileSlice.actions;

const handleServerError = (
  dispatch: ThunkDispatch<CombinedState<unknown>, unknown, Action<string>>,
  error: string
) => {
  console.error(error);
  dispatch(
    setError({ server: "Sorry, we cannot handle your request right now." })
  );
};

export const fetchUserAvatarAsync = (): AppThunk => async (dispatch) => {
  let response: AxiosResponse<AvatarResponse>;
  try {
    response = await fetchAvatar();
  } catch (error) {
    handleServerError(dispatch, error);
    return error;
  }
  const body = response.data;
  if (body.success) {
    dispatch(clearError());
    dispatch(setProfile({ avatar: body.data! }));
  } else {
    if (body.errors) {
      dispatch(setError({ server: body.errors[0].message }));
    } else {
      dispatch(
        setError({
          server: "Sorry, the profile service is temporarily unavailable.",
        })
      );
    }
  }
};

export default userProfileSlice.reducer;
