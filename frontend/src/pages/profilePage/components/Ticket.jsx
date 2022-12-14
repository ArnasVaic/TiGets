import { Typography, Button, Grid } from "@mui/material";
import { StyledTicket } from "./Ticket.styled";
import SubmitButton from "../../../generalComponents/SubmitButton";
import { patchMoveTicket } from "../../../services/profileService";
import { useDispatch } from "react-redux";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { GREEN_BUTTON, TICKET_HOVER, TICKET_URL } from "../../../constants";
import { StyledText } from "../../../generalComponents/styled/Text.styled";

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
  const navigate = useNavigate();
  const [isHovering, setIsHovering] = useState(false);
  const [color, setColor] = useState("");

  const handleMouseOver = () => {
    setIsHovering(true);
    setColor(TICKET_HOVER);
  };

  const handleMouseOut = () => {
    setIsHovering(false);
    setColor("");
  };

  const handleTicketInfoClick = () => {
    navigate(TICKET_URL(ticketId));
  };

  return (
    <StyledTicket
      onMouseOver={handleMouseOver}
      onMouseOut={handleMouseOut}
      style={{
        backgroundColor: color,
      }}
    >
      <Grid container spacings={2}>
        <Grid item xs={4}>
          <StyledText variant="h6">{eventName}</StyledText>
        </Grid>
        <Grid item xs={4}>
          <StyledText>{address}</StyledText>
        </Grid>

        <Grid item xs={4}>
          <StyledText>
            {validFrom} → {validTo}
          </StyledText>
        </Grid>
        <Grid item xs={4}>
          <StyledText>{cost} Eur</StyledText>
        </Grid>
      </Grid>

      <div>
        {isOffMarket && (
          <Button
            onClick={() => {
              dispatch(patchMoveTicket(ticketId, 0));
            }}
            style={{
              backgroundColor: GREEN_BUTTON,
              fontFamily: "Unbounded",
              color: "white",
            }}
          >
            Put into the market
          </Button>
        )}
        {!isOffMarket && (
          <SubmitButton
            text="Take off the market"
            onClick={() => {
              dispatch(patchMoveTicket(ticketId, 1));
            }}
          />
        )}
      </div>
    </StyledTicket>
  );
}

export default Ticket;
