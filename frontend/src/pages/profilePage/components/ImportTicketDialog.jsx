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
import { DateTimePicker } from "@mui/x-date-pickers/DateTimePicker";
import dayjs from "dayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { StyledJustValueTextField } from "../../../generalComponents/styled/JustValueTextField.styled";
import { setErrorMessage } from "../../../slices/profileSlice";
import SubmitButton from "../../../generalComponents/SubmitButton";

function ImportTicketDialog({ open, setOpen }) {
  const dispatch = useDispatch();
  const [eventName, setEventName] = useState();
  const [address, setAddress] = useState();
  const [validFrom, setValidFrom] = useState(dayjs());
  const [validTo, setValidTo] = useState(dayjs());
  const [cost, setCost] = useState();

  return (
    <Dialog
      open={open}
      onClose={() => setOpen(false)}
      style={{ height: "600px", borderRadius: 0 }}
    >
      <DialogTitle>Enter the ticket data</DialogTitle>
      <DialogContent style={{ display: "flex", flexDirection: "column" }}>
        <LocalizationProvider dateAdapter={AdapterDayjs}>
          <DateTimePicker
            label="valid from"
            value={validFrom}
            onChange={(value) => {
              setValidFrom(value.format("YYYY-MM-DDTHH:mm:ss[Z]"));
            }}
            renderInput={(params) => <StyledJustValueTextField {...params} />}
          />
          <DateTimePicker
            label="valid to"
            value={validTo}
            onChange={(value) => {
              setValidTo(value.format("YYYY-MM-DDTHH:mm:ss[Z]"));
            }}
            renderInput={(params) => <StyledJustValueTextField {...params} />}
          />
        </LocalizationProvider>
        <JustValueTextField label="event name" setValue={setEventName} />
        <JustValueTextField label="address" setValue={setAddress} />
        <JustValueTextField label="cost (Eur)" setValue={setCost} />
      </DialogContent>

      <DialogActions
        style={{ display: "flex", justifyContent: "space-around" }}
      >
        <SubmitButton
          onClick={() => {
            if (!(eventName && address && cost && validFrom && validTo)) {
              dispatch(setErrorMessage("All fields are required"));
            } else if (isNaN(cost)) {
              dispatch(setErrorMessage("Cost should be a number"));
            } else {
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
            }
            setOpen(false);
          }}
          text={"Import"}
        />
        <Button
          style={{ borderRadius: 0 }}
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
