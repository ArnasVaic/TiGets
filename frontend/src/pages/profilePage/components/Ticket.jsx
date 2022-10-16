import { Typography, Button } from "@mui/material";
import { StyledTicket } from "./Ticket.styled";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";

function Ticket({
  eventName,
  address,
  validFrom,
  validTo,
  ticketId,
  cost,
  isOffMarket,
}) {
  return (
    <StyledTicket>
      <Typography>{eventName}</Typography>
      <Typography>{address}</Typography>
      <Typography>{validFrom}</Typography>
      <ArrowForwardIcon fontSize="large" />
      <Typography>{validTo}</Typography>
      <Typography>{cost} Eur</Typography>
      {isOffMarket && <Button variant="contained">Sell</Button>}
      {!isOffMarket && <Button variant="contained">Take off the market</Button>}
    </StyledTicket>
  );
}

export default Ticket;
