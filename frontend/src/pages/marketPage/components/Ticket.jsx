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

function Ticket({ ticketId, eventName, address, validFrom, validTo, cost }) {
  const [isHovering, setIsHovering] = useState(false);
  const [color, setColor] = useState("");
  const [open, setOpen] = useState(false);
  const [buyEvent, setBuyEvent] = useState();
  const dispatch = useDispatch();

  const handleMouseOver = () => {
      setIsHovering(true);
      setColor("lightBlue");
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
    dispatch(patchBuy(buyEvent.target.id));
    setOpen(false);
  };



  return (
      <StyledTicket onMouseOver={handleMouseOver} onMouseOut={handleMouseOut}
        style = {{ backgroundColor: color }
      }
      >
      <Typography>{eventName}</Typography>
      <Typography>{address}</Typography>
      <Typography>{validFrom}</Typography>
      <ArrowForwardIcon fontSize="large" />
      <Typography>{validTo}</Typography>

      <Button id={ticketId} variant="contained" onClick={handleBuyAttempt}>
        Buy {cost}Eur
      </Button>

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
