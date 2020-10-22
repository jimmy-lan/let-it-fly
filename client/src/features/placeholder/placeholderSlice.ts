/**
 * This file contains a placeholder slice which provides a dummy reducer for
 * the redux store. It also gives an example on how to create slice.
 *
 * @author Jimmy Lan
 */
import { createSlice } from "@reduxjs/toolkit";

interface PlaceholderState {
  value: number;
}

const initialState: PlaceholderState = {
  value: 3240,
};

const placeholderSlice = createSlice({
  name: "placeholder",
  initialState,
  reducers: {},
});

export default placeholderSlice.reducer;
