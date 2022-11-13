import { configureStore } from "@reduxjs/toolkit";
import profileReducer from "../slices/profileSlice";
import marketReducer from "../slices/marketSlice";
import ticketReducer from "../slices/ticketSlice";

export const store = configureStore({
  reducer: {
    profile: profileReducer,
    market: marketReducer,
    ticket: ticketReducer,
  },
});
