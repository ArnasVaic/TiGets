import { createSlice } from "@reduxjs/toolkit";

export const marketSlice = createSlice({
  name: "market",
  initialState: {
    tickets: [],
  },
  reducers: {
    setMarketTickets: (state, action) => {
      state.tickets = action.payload;
    },
  },
});

export const { setMarketTickets } = marketSlice.actions;

export const selectMarketTickets = (state) => state.market.tickets;

export default marketSlice.reducer;
