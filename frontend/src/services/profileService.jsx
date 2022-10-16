import { GET_PROFILE_TICKETS, PATCH_ADD_BALANCE } from "../constants";

export const getProfileTickets = () => async (dispatch) => {
    try {
        const response = await fetch(GET_PROFILE_TICKETS, {
            method: "GET",
            credentials: "include",
        });
        if (response.ok) {
            dispatch(setProfileTickets(await response.json()));
        } else {
            alert("Something went wrong. Please try again");
        }
    } catch (error) {
        alert("Oops, server error");
    }
};

export const addBalance = () => async (dispatch) => {
    try {
        const response = await fetch(PATCH_ADD_BALANCE, {
            method: "PATCH",
            credentials: "include",
        });
        if (response.ok) {
            dispatch();
        } else {
            alert("Something went wrong. Please try again");
        }
    } catch (error) {
        alert("Oops, server error");
    }
};