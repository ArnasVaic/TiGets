import {
  GET_PROFILE_TICKETS,
  GET_USER_DATA_URL,
  PATCH_ADD_BALANCE,
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
