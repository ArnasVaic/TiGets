import { Typography } from "@mui/material";
import { StyledTicket } from "./Ticket.styled";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import SubmitButton from "../../../generalComponents/SubmitButton";
import { patchMoveTicket } from "../../../services/profileService";
import { useDispatch } from "react-redux";

function Ticket({
  ticketId,
  eventName,
  address,
  validFrom,
  validTo,
  cost,
  isOffMarket,
}) {
  const dispatch = useDispatch();
  return (
    <StyledTicket>
      <Typography>{eventName}</Typography>
      <Typography>{address}</Typography>
      <Typography>{validFrom}</Typography>
      <ArrowForwardIcon fontSize="large" />
      <Typography>{validTo}</Typography>
      <Typography>{cost} Eur</Typography>
      {isOffMarket && (
        <SubmitButton
          text="Sell"
          onClick={() => {
            dispatch(patchMoveTicket(ticketId, 0));
          }}
        />
      )}
      {!isOffMarket && (
        <SubmitButton
          text="Take off the market"
          onClick={() => {
            dispatch(patchMoveTicket(ticketId, 1));
          }}
        />
      )}
    </StyledTicket>
  );
}

export default Ticket;
