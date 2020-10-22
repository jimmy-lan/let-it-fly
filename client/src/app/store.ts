import { configureStore, ThunkAction, Action } from "@reduxjs/toolkit";
import placeholderReducer from "../features/placeholder/placeholderSlice";

export const store = configureStore({
  reducer: {
    placeholder: placeholderReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;
