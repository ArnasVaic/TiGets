import { createSlice } from "@reduxjs/toolkit";

export const profileSlice = createSlice({
  name: "profile",
  initialState: {
    userData: [],
    tickets: [],
  },
  reducers: {
    setUserData: (state, action) => {
      state.userData = action.payload;
    },
    setTickets: (state, action) => {
      state.tickets = action.payload;
    },
  },
});

export const { setUserData } = profileSlice.actions;

export const selectUserData = (state) => state.profile.userData;
export const selectTickets = (state) => state.profile.tickets;

export default profileSlice.reducer;
