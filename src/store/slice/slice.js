import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  bgColor: "#f8f8f8",
  isModalOpen: false
};

const slice = createSlice({
  name: "slice",
  initialState,
  reducers: {
    changeBgColor: (state, action) => {
      state.bgColor = action.payload;
    },
    changeModalState: (state, action) => {
      state.isModalOpen = action.payload;
    }
  }
});

const { actions, reducer } = slice;
export const { changeBgColor, changeModalState } = actions;

export default reducer;
