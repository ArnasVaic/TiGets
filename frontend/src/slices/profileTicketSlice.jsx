

export const profileTicketSlice = createSlice({
    name: "profile",
    initialState: {
        tickets: [],
    },
    reducers: {
        setProfileTickets: (state, action) => {
            state.tickets = action.payload;
        },
    },
});

export const { setProfileTickets } = profileTicketSlice.action;

export const selectProfileTickets = (state) => state.profile.tickets;

export default profileTicketSlice.reducer;
