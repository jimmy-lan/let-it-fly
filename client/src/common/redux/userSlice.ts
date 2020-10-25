/**
 * Created by Jimmy Lan
 * Creation Date: 2020-10-25
 * Description:
 *    Slice managing general user information for route protection
 *    and rendering purposes.
 */

import { createSlice } from "@reduxjs/toolkit";

interface UserState {
  isAuthenticated: boolean;
  email?: string;
  avatarLink?: string;
}

const initialState: UserState = {
  isAuthenticated: false,
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {},
});

export const {} = userSlice.actions;

export default userSlice.reducer;
