import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  bookmarks: [],
  data: "123"
};

const slice = createSlice({
  name: "bookmarks",
  initialState,
  reducers: {
    setBookmark: (state, action) => {
      state.bookmarks.push(...action.payload);
    },
    click: (state) => {
      state.click = "222";
    }
  }
});

const { actions, reducer } = slice;
export const { setBookmark, click } = actions;

export default reducer;
