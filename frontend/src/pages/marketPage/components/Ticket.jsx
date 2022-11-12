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
  const [isHoveringAbout, setIsHoveringAbout] = useState(false);
  const [aboutColor, setAboutColor] = useState("");
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

  const handleAbout = () => {
        setIsHoveringAbout(true);
      setAboutColor("#D63448");
  };

  const handleOutAbout = () => {
        setIsHoveringAbout(false);
        setAboutColor("");
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
          style={{
              backgroundColor: color, }}
      >

        <div style={{ flexDirection: "column", alignItems: "center" }}>
            <Typography variant="h6">{eventName}</Typography>
            <Typography onMouseOver={handleAbout} onMouseOut={handleOutAbout}
            style={{
                    marginTop: 10,
                    border: 1,
                    padding: 5,
                    outlineStyle: "solid",
                    outlineWidth: "thin",
                    outlineColor: aboutColor,
            }}>
                About ticket</Typography>
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
           <Button id={ticketId} variant="contained" onClick={handleBuyAttempt} style={{ marginRight: 10 }}>
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
