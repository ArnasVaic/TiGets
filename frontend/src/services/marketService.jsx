import { GET_MARKET_TICKETS, PATCH_BUY_URL } from "../constants";
import { setMarketTickets } from "../slices/marketSlice";

export const patchBuy = (ticketId, setErrorMsg, setOpenError) => async (dispatch) => {
  try {
    const response = await fetch(PATCH_BUY_URL(ticketId), {
      method: "PATCH",
      credentials: "include",
    });
    if (response.ok) {
      alert("Ticket was successfully bought");
      dispatch(getMarketTickets());
    } else {
        let errMsg = new TextDecoder().decode(
            (await response.body.getReader().read()).value
        );
        if (errMsg === "User does not have enough money to buy this ticket.") {
            setErrorMsg("User does not have enough money to buy this ticket.");
            setOpenError(true);
        }
        else {
            alert("Something went wrong. Please try again");
        }
    }
  } catch (error) {
    alert("Oops, server error");
  }
};

export const getMarketTickets = () => async (dispatch) => {
  try {
    const response = await fetch(GET_MARKET_TICKETS, {
      method: "GET",
      credentials: "include",
    });
    if (response.ok) {
      dispatch(setMarketTickets(await response.json()));
    } else {
      alert("Something went wrong. Please try again");
    }
  } catch (error) {
    alert("Oops, server error");
  }
};
