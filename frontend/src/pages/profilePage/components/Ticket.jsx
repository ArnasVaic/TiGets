import { Typography, Button } from "@mui/material";
import { StyledTicket } from "./Ticket.styled";
import SubmitButton from "../../../generalComponents/SubmitButton";
import { patchMoveTicket } from "../../../services/profileService";
import { useDispatch } from "react-redux";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { TICKET_URL } from "../../../constants";

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
        setColor("#BED0E5");
    };

    const handleMouseOut = () => {
        setIsHovering(false);
        setColor("");
    };

    const handleTicketInfoClick = () => {
        navigate(TICKET_URL(ticketId));
    }

  return (
      <StyledTicket onMouseOver={handleMouseOver} onMouseOut={handleMouseOut}
          style={{
              backgroundColor: color,
          }}
      >
          <div style={{ flexDirection: "column", alignItems: "center" }}>
              <Typography variant="h6">{eventName}</Typography>
              <Button onClick={handleTicketInfoClick}
                  style={{
                      marginTop: 10,
                      border: 1,
                      padding: 5,
                  }}>
                  About ticket</Button>
          </div >
          <div style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
          }}>
              <Typography> Valid from {validFrom} to {validTo}</Typography>
              <Typography>{address}</Typography>
          </div>
          <div>
              <Typography>{cost} Eur</Typography>
          </div>
          <div>
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
          </div>
    </StyledTicket>
  );
}

export default Ticket;
