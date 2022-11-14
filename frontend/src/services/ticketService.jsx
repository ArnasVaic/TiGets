import {
  GET_TRANSFERS_URL
} from "../constants";
import { setTransfers } from "../slices/ticketSlice";

export const getTransfers = (ticketId) => async (dispatch) => {
    try {
        const response = await fetch(GET_TRANSFERS_URL(ticketId), {
            method: "GET",
            credentials: "include",
        });
        if (response.ok) {
            dispatch(setTransfers(await response.json()));
        } else {
            alert("Something went wrong. Please try again");
        }
    } catch (error) {
        alert("Oops, server error");
    }
};