import { configureStore, ThunkAction, Action } from "@reduxjs/toolkit";
import userAuthReducer from "../common/redux/userSlice";

export const store = configureStore({
  reducer: {
    userAuth: userAuthReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;
