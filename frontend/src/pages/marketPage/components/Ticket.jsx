import {
  Typography,
  Button,
  Dialog,
  DialogTitle,
  DialogActions,
  Grid,
} from "@mui/material";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { patchBuy } from "../../../services/marketService";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import { StyledTicket } from "./Ticket.styled";
import { StyledText } from "../../../generalComponents/styled/Text.styled";
import { DARK_BUTTON, TICKET_HOVER } from "../../../constants";
import SubmitButton from "../../../generalComponents/SubmitButton";

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
    setColor(TICKET_HOVER);
  };

  const handleMouseOut = () => {
    setIsHovering(false);
    setColor("");
  };

  const handleBuyAttempt = (event) => {
    setBuyEvent(event);
    setOpen(true);
    console.log(event.target.id);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleBuy = () => {
    dispatch(patchBuy(ticketId, setErrMsg, setSuccMsg));
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
      </Grid>
      <SubmitButton
        id={ticketId}
        text={`Buy ticket ${cost} Eur`}
        onClick={handleBuyAttempt}
      />

      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>Are you sure you want to buy this ticket?</DialogTitle>
        <DialogActions>
          <SubmitButton onClick={handleBuy} text={"Yes, please"} />
          <Button onClick={handleClose}>Cancel</Button>
        </DialogActions>
      </Dialog>
    </StyledTicket>
  );
}

export default Ticket;
