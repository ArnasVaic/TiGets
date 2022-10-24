import {
  Typography,
  Button,
  Dialog,
  DialogTitle,
  DialogActions,
} from "@mui/material";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { patchBuy } from "../../../services/marketService";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import { StyledTicket } from "./Ticket.styled";

function Ticket({ ticketId, eventName, address, validFrom, validTo, cost }) {
  const [open, setOpen] = useState(false);
  const [buyEvent, setBuyEvent] = useState();
  const [openError, setOpenError] = useState(false);
  const [errorMsg, setErrorMsg] = useState();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleBuyAttempt = (event) => {
    setBuyEvent(event);
    setOpen(true);
  };

  const handleGoToProfile = () => {
     navigate('/profile');
  }
    
  const handleClose = () => {
    setOpen(false);
  };

  const handleErrorClose = () => {
     setOpenError(false);
  };

  const handleBuy = () => {
    dispatch(patchBuy(buyEvent.target.id, setErrorMsg, setOpenError));
    setOpen(false);
  };

  return (
    <StyledTicket>
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

      <Dialog open={openError} onClose={handleErrorClose}>
        <DialogTitle>There is not enough money in your account. Add balance in your profile page.</DialogTitle>
        <DialogActions>
          <Button variant="contained" onClick={handleGoToProfile} autoFocus>
             Go to profile
          </Button>
          <Button onClick={handleErrorClose}>Close</Button>
        </DialogActions>
      </Dialog>
      
    </StyledTicket>
  );
}

export default Ticket;
