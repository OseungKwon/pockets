import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  // eslint-disable-next-line no-undef
  bgColor: "#f8f8f8",
  focusUrl: { title: "", viewCount: 0 },
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
    },
    fixFocus: (state, action) => {
      state.focusUrl = action.payload;
    }
  }
});

const { actions, reducer } = slice;
export const { changeBgColor, changeModalState, fixFocus } = actions;

export default reducer;
