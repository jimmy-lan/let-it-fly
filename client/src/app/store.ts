/**
 * Created by Jimmy Lan
 * Creation Date: 2020-10-26
 */

import {
  configureStore,
  ThunkAction,
  Action,
  getDefaultMiddleware,
  combineReducers,
} from "@reduxjs/toolkit";
import {
  persistReducer,
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
} from "redux-persist";
import storage from "redux-persist/lib/storage/session";

import userAuthReducer from "./redux/userAuthSlice";
import userProfileReducer from "./redux/userProfileSlice";
import userPropertyReducer from "./redux/userPropertySlice";
import appFrameReducer from "./redux/appFrameSlice";

const reducers = combineReducers({
  userAuth: userAuthReducer,
  userProfile: userProfileReducer,
  userProperty: userPropertyReducer,
  appFrame: appFrameReducer,
});

const persistedReducer = persistReducer(
  {
    key: "root",
    storage,
  },
  reducers
);

export const store = configureStore({
  reducer: persistedReducer,
  middleware: getDefaultMiddleware({
    serializableCheck: {
      ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
    },
  }),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;
