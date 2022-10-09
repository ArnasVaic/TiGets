import { DialogContent } from "@material-ui/core";
import {
  Typography,
  Button,
  Dialog,
  DialogTitle,
  DialogActions,
} from "@mui/material";
import { useState } from "react";

function Ticket({ ticketId, name, address, date, price }) {
  const [open, setOpen] = useState(false);
  const [buyEvent, setBuyEvent] = useState();

  const handleBuyAttempt = (event) => {
    setBuyEvent(event);
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleBuy = () => {
    alert(`Ticket with id=${buyEvent.target.id} was bought`);
    setOpen(false);
  };

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "row",
        border: "2px solid black",
        borderRadius: "5px",
        padding: "5px",
      }}
    >
      <Typography style={{ padding: "10px 50px" }}>{name}</Typography>
      <Typography style={{ padding: "10px 50px" }}>{address}</Typography>
      <Typography style={{ padding: "10px 50px" }}>{date}</Typography>

      <Button id={ticketId} variant="contained" onClick={handleBuyAttempt}>
        Buy {price}Eur
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
    </div>
  );
}

export default Ticket;
