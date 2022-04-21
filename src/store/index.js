import { configureStore } from "@reduxjs/toolkit";
import { useDispatch } from "react-redux";

import bookmarkReducer from "./slice/bookmarkSlice";
import reducer from "./slice/slice";

const store = configureStore({
  reducer: {
    bookmark: bookmarkReducer,
    slice: reducer
  },
  devTools: process.env.NODE_ENV !== "production"
});

export default store;
