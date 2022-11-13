import {
  Typography,
  Button,
  Dialog,
  DialogTitle,
  DialogActions,
} from "@mui/material";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { patchBuy } from "../../../services/marketService";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import { StyledTicket } from "./Ticket.styled";

function Ticket({
  setErrMsg,
  setSuccMsg,
  ticketId,
  eventName,
  address,
  validFrom,
  validTo,
  cost,
}) {
  const [isHovering, setIsHovering] = useState(false);
  const [color, setColor] = useState("");
  const [open, setOpen] = useState(false);
  const [buyEvent, setBuyEvent] = useState();
  const dispatch = useDispatch();

  const handleMouseOver = () => {
    setIsHovering(true);
    setColor("#BED0E5");
  };

  const handleMouseOut = () => {
    setIsHovering(false);
    setColor("");
  };

  const handleBuyAttempt = (event) => {
    setBuyEvent(event);
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleBuy = () => {
    dispatch(patchBuy(buyEvent.target.id, setErrMsg, setSuccMsg));
    setOpen(false);
  };

  const handleTicketInfo = () => {
    //don't know what should be displayed yet
  };

  return (
    <StyledTicket
      onMouseOver={handleMouseOver}
      onMouseOut={handleMouseOut}
      style={{
        backgroundColor: color,
      }}
    >
      <div style={{ flexDirection: "column", alignItems: "center" }}>
        <Typography variant="h6">{eventName}</Typography>
      </div>
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <Typography>
          {" "}
          Valid from {validFrom} to {validTo}
        </Typography>
        <Typography>{address}</Typography>
      </div>
      <div>
        <Button
          id={ticketId}
          variant="contained"
          onClick={handleBuyAttempt}
          style={{ marginRight: 10 }}
        >
          Buy ticket {cost} Eur
        </Button>
      </div>

      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>Are you sure you want to buy this ticket?</DialogTitle>
        <DialogActions>
          <Button variant="contained" onClick={handleBuy} autoFocus>
            Yes, please
          </Button>
          <Button onClick={handleClose}>Cancel</Button>
        </DialogActions>
      </Dialog>
    </StyledTicket>
  );
}

export default Ticket;
