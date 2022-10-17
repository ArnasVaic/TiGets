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
    setUserTickets: (state, action) => {
      state.tickets = action.payload;
    },
  },
});

export const { setUserData, setUserTickets } = profileSlice.actions;

export const selectUserData = (state) => state.profile.userData;
export const selectUserTickets = (state) => state.profile.tickets;

export default profileSlice.reducer;
