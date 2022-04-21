import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  bgColor: "#f8f8f8"
};

const slice = createSlice({
  name: "slice",
  initialState,
  reducers: {
    changeBgColor: (state, action) => {
      console.log("pay", action, action.payload);
      state.bgColor = action.payload;
    }
  }
});

const { actions, reducer } = slice;
export const { changeBgColor } = actions;

export default reducer;
