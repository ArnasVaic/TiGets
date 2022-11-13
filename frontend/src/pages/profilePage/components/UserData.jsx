import { Button, Typography } from "@mui/material";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import JustValueTextField from "../../../generalComponents/JustValueTextField";
import { StyledCenteredColumn } from "../../../generalComponents/styled/CenteredColumn.styled";
import SubmitButton from "../../../generalComponents/SubmitButton";
import { addBalance } from "../../../services/profileService";
import {
  selectUserData,
  setErrorMessage,
} from "../../../slices/profileSlice";
import ImportTicketDialog from "./ImportTicketDialog";
import { StyledProfileMenu } from "./ProfileMenu.styled";

function UserData() {
  const [enteredAmount, setEnteredAmount] = useState();
  const userData = useSelector(selectUserData);
  const [importOpen, setImportOpen] = useState(false);
  const dispatch = useDispatch();

  return (
    <StyledProfileMenu>
      <StyledCenteredColumn spacing={2}>
        <Typography>Your balance: {userData.balance} Eur</Typography>
        <JustValueTextField label="Enter amount" setValue={setEnteredAmount} />
        <SubmitButton
          text="Add money"
          onClick={() => {
            if (!isNaN(enteredAmount)) {
              dispatch(addBalance(enteredAmount));
            } else {
              dispatch(
                setErrorMessage(
                  "Woah, woah... This does not seem like an integer..."
                )
              );
            }
          }}
        />


      <Button
         variant="contained"
         onClick={() => {
             setImportOpen(true);
          }}
         >
         Import ticket
       </Button>
       <ImportTicketDialog open={importOpen} setOpen={setImportOpen} />

        <div style={{ backgroundColor: "#6E8195", borderRadius: "5px", padding: "5px"}}>
        <Typography>Username: {userData.userName} </Typography>
        <Typography>{userData.name} {userData.surname} </Typography>
        <Typography>{userData.email} </Typography>
        <Typography>{userData.phoneNumber} </Typography>
        </div>

      </StyledCenteredColumn>
    </StyledProfileMenu>
  );
}

export default UserData;
