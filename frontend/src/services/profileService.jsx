import { GET_PROFILE_TICKETS, PATCH_ADD_BALANCE } from "../constants";
import { increaseBalanceBy } from "../slices/profileSlice";

export const getUserTickets = () => async (dispatch) => {
    try {
        const response = await fetch(GET_PROFILE_TICKETS, {
            method: "GET",
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

export const addBalance = (amount) => async (dispatch) => {
    try {
        const response = await fetch(PATCH_ADD_BALANCE(amount), {
            method: "PATCH",
            credentials: "include",
        });
        if (response.ok) {
            dispatch(increaseBalanceBy(amount));
        } else {
            alert("Something went wrong. Please try again");
            console.log(response.json());
        }
    } catch (error) {
        alert("Oops, server error" + error);
    }
};