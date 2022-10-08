import { createSlice } from "@reduxjs/toolkit";

export const marketSlice = createSlice({
  name: "market",
  initialState: {
    tickets: [
      {
        name: "Pasnekesiai",
        address: "Verkiu 1",
        date: "2022-10-10",
        price: "10",
      },
      {
        name: "Fejerverkai",
        address: "Nebeverkiu 1",
        date: "2050-12-12",
        price: "69",
      },
      {
        name: "Galapagai",
        address: "Anyksciai",
        date: "2027-10-10",
        price: "15",
      },
      {
        name: "Troliu pica",
        address: "Miskenai",
        date: "2022-12-23",
        price: "12.24",
      },
    ],
  },
  reducers: {
    setTickets: (state, action) => {
      state.tickets = action.payload;
    },
  },
});

export const { setMarketTickets } = marketSlice.actions;

export const selectMarketTickets = (state) => state.market.tickets;

export default marketSlice.reducer;
