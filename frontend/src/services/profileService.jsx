import {
  GET_PROFILE_TICKETS,
  GET_USER_DATA_URL,
  PATCH_ADD_BALANCE,
  PATCH_MOVE_TICKET_URL,
  POST_IMPORT_TICKET_URL,
} from "../constants";
import { setUserData, setUserTickets } from "../slices/profileSlice";

export const getUserTickets = () => async (dispatch) => {
  try {
    const response = await fetch(GET_PROFILE_TICKETS, {
      method: "GET",
      credentials: "include",
    });
    if (response.ok) {
      dispatch(setUserTickets(await response.json()));
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
      dispatch(getUserData());
    } else {
      alert("Something went wrong. Please try again");
    }
  } catch (error) {
    alert("Oops, server error" + error);
  }
};

export const getUserData = () => async (dispatch) => {
  try {
    const response = await fetch(GET_USER_DATA_URL, {
      method: "GET",
      credentials: "include",
    });
    if (response.ok) {
      dispatch(setUserData(await response.json()));
    } else {
      alert("Something went wrong. Please try again");
    }
  } catch (error) {
    alert("Oops, server error");
  }
};

export const patchMoveTicket = (ticketId, isOffMarket) => async (dispatch) => {
  try {
    const response = await fetch(PATCH_MOVE_TICKET_URL(ticketId, isOffMarket), {
      method: "PATCH",
      credentials: "include",
    });
    if (response.ok) {
      dispatch(getUserTickets());
    } else {
      alert("Something went wrong. Please try again");
    }
  } catch (error) {
    alert("Oops, server error");
  }
};

export const postImportTicket = (ticket) => async (dispatch) => {
  try {
    const response = await fetch(POST_IMPORT_TICKET_URL, {
      method: "POST",
      credentials: "include",
      body: JSON.stringify(ticket),
    });
    if (response.ok) {
      dispatch(getUserTickets());
    } else {
      alert("Something went wrong. Please try again");
    }
  } catch (error) {
    alert("Oops, server error");
  }
};
