import { createSlice } from "@reduxjs/toolkit";

export const profileSlice = createSlice({
  name: "profile",
  initialState: {
    userData: [],
    tickets: [],
    errMsg: "",
    succMsg: "",
  },
  reducers: {
    setUserData: (state, action) => {
      state.userData = action.payload;
    },
    setUserTickets: (state, action) => {
      state.tickets = action.payload;
    },
    setSuccessMessage: (state, action) => {
      state.succMsg = action.payload;
      state.errMsg = "";
    },
    setErrorMessage: (state, action) => {
      state.errMsg = action.payload;
      state.succMsg = "";
    },
  },
});

export const {
  setUserData,
  setUserTickets,
  setSuccessMessage,
  setErrorMessage,
} = profileSlice.actions;

export const selectUserData = (state) => state.profile.userData;
export const selectUserTickets = (state) => state.profile.tickets;
export const selectSuccessMessage = (state) => state.profile.succMsg;
export const selectErrorMessage = (state) => state.profile.errMsg;

export default profileSlice.reducer;
