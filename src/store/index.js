import { configureStore } from "@reduxjs/toolkit";
import { useDispatch } from "react-redux";

import bookmarkReducer from "./slice/bookmarkSlice";

const store = configureStore({
  reducer: {
    bookmark: bookmarkReducer
  },
  devTools: process.env.NODE_ENV !== "production"
});

export default store;
