import { GET_MARKET_TICKETS, PATCH_BUY_URL } from "../constants";
import { setMarketTickets } from "../slices/marketSlice";

export const patchBuy =
  (ticketId, setErrorMsg, setSuccessMsg) => async (dispatch) => {
    try {
      const response = await fetch(PATCH_BUY_URL(ticketId), {
        method: "PATCH",
        credentials: "include",
      });
      if (response.ok) {
        setSuccessMsg("Ticket was successfully bought");
        setErrorMsg(null);
        dispatch(getMarketTickets());
      } else {
        setErrorMsg(
          new TextDecoder().decode(
            (await response.body.getReader().read()).value
          )
        );
        setSuccessMsg(null);
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
      let errMsg = new TextDecoder().decode(
        (await response.body.getReader().read()).value
      );
      alert("Something went wrong. Please try again\n" + errMsg);
    }
  } catch (error) {
    alert("Oops, server error");
  }
};
