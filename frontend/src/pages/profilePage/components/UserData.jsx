import { Button, Typography } from "@mui/material";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { BACKGROUND, GREEN_BUTTON, TICKET } from "../../../constants";
import JustValueTextField from "../../../generalComponents/JustValueTextField";
import { StyledCenteredColumn } from "../../../generalComponents/styled/CenteredColumn.styled";
import { StyledText } from "../../../generalComponents/styled/Text.styled";
import SubmitButton from "../../../generalComponents/SubmitButton";
import { addBalance } from "../../../services/profileService";
import { selectUserData, setErrorMessage } from "../../../slices/profileSlice";
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
        <StyledText style={{ textAlign: "center" }}>Your balance:</StyledText>
        <StyledText variant="h6" style={{ textAlign: "center" }}>
          {" "}
          {userData.balance} Eur
        </StyledText>
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

        <SubmitButton
          onClick={() => {
            setImportOpen(true);
          }}
          text={"Import ticket"}
        />
        <ImportTicketDialog open={importOpen} setOpen={setImportOpen} />

        <div
          style={{
            backgroundColor: TICKET,
            borderRadius: 0,
            padding: "15px",
          }}
        >
          <StyledText>{userData.userName} </StyledText>
          <StyledText style={{ paddingTop: "10px" }}>
            {userData.name} {userData.surname}{" "}
          </StyledText>
          <StyledText style={{ paddingTop: "10px" }}>
            {userData.email}{" "}
          </StyledText>
          <StyledText style={{ paddingTop: "10px" }}>
            {userData.phoneNumber}{" "}
          </StyledText>
        </div>
      </StyledCenteredColumn>
    </StyledProfileMenu>
  );
}

export default UserData;
