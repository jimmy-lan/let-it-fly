/**
 * Created by Jimmy Lan
 * Creation Date: 2020-11-01
 * Description:
 *    Redux slice for the <AppFrame> component.
 *    Store information mainly related to display settings.
 */
import {
  createSlice,
  PayloadAction,
  SliceCaseReducers,
} from "@reduxjs/toolkit";

export enum SideBarState {
  Expanded,
  Compacted,
  Closed,
}

export interface AppFrameState {
  sideBarState: SideBarState;
}

const initialState = {
  sideBarState: SideBarState.Expanded,
};

const appFrameSlice = createSlice<
  AppFrameState,
  SliceCaseReducers<AppFrameState>,
  string
>({
  name: "appFrame",
  initialState,
  reducers: {
    setSideBarState: (
      state: AppFrameState,
      { payload }: PayloadAction<SideBarState>
    ) => {
      state.sideBarState = payload;
    },
  },
});

export const { setSideBarState } = appFrameSlice.actions;

export default appFrameSlice.reducer;
