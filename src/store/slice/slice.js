import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  // eslint-disable-next-line no-undef
  bgColor: "#f8f8f8",
  isModalOpen: false
};

const slice = createSlice({
  name: "slice",
  initialState,
  reducers: {
    changeBgColor: (state, action) => {
      // eslint-disable-next-line no-undef
      chrome.storage.sync.set({ bgColor: action.payload });
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
