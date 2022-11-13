import { createSlice } from "@reduxjs/toolkit";

export const ticketSlice = createSlice({
    name: "ticket",
    initialState: {
        transfers: [],
    },
    reducers: {
        setTransfers: (state, action) => {
            state.transfers = action.payload;
        },
    },
});

export const { setTransfers } = ticketSlice.actions;

export const selectTransfers = (state) => state.ticket.transfers;

export default ticketSlice.reducer;

