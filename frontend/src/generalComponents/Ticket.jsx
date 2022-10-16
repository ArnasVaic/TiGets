import {
  Typography,
  Button,
  Dialog,
  DialogTitle,
  DialogActions,
} from "@mui/material";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { patchBuy } from "../services/marketService";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import { StyledTicket } from './styled/Ticket.styled';

function Ticket({ ticketId, eventName, address, validFrom, validTo, cost }) {
  const [open, setOpen] = useState(false);
  const [buyEvent, setBuyEvent] = useState();
  const dispatch = useDispatch();

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
    <StyledTicket
      style={{
        display: "flex",
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        border: "2px solid black",
        borderRadius: "5px",
        padding: "5px",
      }}
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
