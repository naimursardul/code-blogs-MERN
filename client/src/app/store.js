import { configureStore } from "@reduxjs/toolkit";
import allHandler from "../features/slices/mainSlice";

export const store = configureStore({
  reducer: {
    mainReducer: allHandler,
  },
});
