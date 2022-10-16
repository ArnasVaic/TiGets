import { configureStore } from "@reduxjs/toolkit";
import profileReducer from "../slices/profileSlice";
import marketReducer from "../slices/marketSlice";

export const store = configureStore({
  reducer: {
    profile: profileReducer,
    market: marketReducer,
  },
});
