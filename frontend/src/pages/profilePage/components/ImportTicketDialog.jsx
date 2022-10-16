import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
} from "@mui/material";
import { useState } from "react";
import { useDispatch } from "react-redux";
import JustValueTextField from "../../../generalComponents/JustValueTextField";
import { postImportTicket } from "../../../services/profileService";

function ImportTicketDialog({ open, setOpen }) {
  const dispatch = useDispatch();
  const [eventName, setEventName] = useState();
  const [address, setAddress] = useState();
  const [validFrom, setValidFrom] = useState();
  const [validTo, setValidTo] = useState();
  const [cost, setCost] = useState();

  return (
    <Dialog
      open={open}
      onClose={() => setOpen(false)}
      style={{ height: "600px" }}
    >
      <DialogTitle>Enter the ticket data</DialogTitle>
      <DialogContent style={{ display: "flex", flexDirection: "column" }}>
        <JustValueTextField label="event name" setValue={setEventName} />
        <JustValueTextField label="address" setValue={setAddress} />
        <JustValueTextField label="valid from" setValue={setValidFrom} />
        <JustValueTextField label="valid to" setValue={setValidTo} />
        <JustValueTextField label="cost (Eur)" setValue={setCost} />
      </DialogContent>

      <DialogActions>
        <Button
          variant="contained"
          color="success"
          onClick={() => {
            dispatch(
              postImportTicket({
                state: 1,
                validFrom: validFrom,
                validTo: validTo,
                eventName: eventName,
                address: address,
                cost: cost,
              })
            );
            setOpen(false);
          }}
          autofocus
        >
          Import
        </Button>
        <Button
          variant="outlined"
          onClick={() => {
            setOpen(false);
          }}
        >
          Cancel
        </Button>
      </DialogActions>
    </Dialog>
  );
}

export default ImportTicketDialog;
