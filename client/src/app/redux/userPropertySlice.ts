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
import { AxiosResponse } from "axios";
import {
  CoinsResponse,
  fetchNumCoins,
} from "../../services/serverApi/propertyApi";

export interface PropertyState {
  property: PropertyPayload;
  error?: string;
}

export interface PropertyPayload {
  coins?: number;
}

const initialState: PropertyState = {
  property: {},
};

const userProfileSlice = createSlice({
  name: "profile",
  initialState,
  reducers: {
    setProperty: (
      state: PropertyState,
      { payload }: PayloadAction<PropertyPayload>
    ) => {
      state.property = payload;
    },
    setError: (state: PropertyState, { payload }: PayloadAction<string>) => {
      state.error = payload;
    },
    clearError: (state: PropertyState) => {
      delete state.error;
    },
  },
});

export const { setProperty, setError, clearError } = userProfileSlice.actions;

const handleServerError = (
  dispatch: ThunkDispatch<CombinedState<unknown>, unknown, Action<string>>,
  error: string
) => {
  console.error(error);
  dispatch(setError("Sorry, we cannot handle your request right now."));
};

export const fetchUserCoinsAsync = (): AppThunk => async (dispatch) => {
  let response: AxiosResponse<CoinsResponse>;
  try {
    response = await fetchNumCoins();
  } catch (error) {
    handleServerError(dispatch, error);
    return error;
  }
  const body = response.data;
  if (body.success) {
    dispatch(clearError());
    dispatch(setProperty({ coins: body.data }));
  } else {
    if (body.errors) {
      dispatch(setError(body.errors[0].message));
    } else {
      dispatch(setError("Sorry, property service is temporarily unavailable."));
    }
  }
};

export default userProfileSlice.reducer;
