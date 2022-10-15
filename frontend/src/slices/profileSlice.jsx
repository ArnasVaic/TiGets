import { createSlice } from "@reduxjs/toolkit";

export const profileSlice = createSlice({
  name: "profile",
  initialState: {
    balance: 10.0,
  },
  reducers: {
    increaseBalanceBy: (state, action) => {
      state.balance += action.payload;
    },
  },
});

export const { increaseBalanceBy } = profileSlice.actions;

export const selectBalance = (state) => state.profile.balance;

export default profileSlice.reducer;
