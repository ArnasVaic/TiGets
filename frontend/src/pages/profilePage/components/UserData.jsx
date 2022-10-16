import { Typography } from "@mui/material";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import JustValueTextField from "../../../generalComponents/JustValueTextField";
import { StyledCenteredColumn } from "../../../generalComponents/styled/CenteredColumn.styled";
import SubmitButton from "../../../generalComponents/SubmitButton";
import { addBalance } from "../../../services/profileService";
import { selectUserData } from "../../../slices/profileSlice";
import { StyledProfileMenu } from "./ProfileMenu.styled";

function UserData() {
  const [enteredAmount, setEnteredAmount] = useState();
  const userData = useSelector(selectUserData);
  const dispatch = useDispatch();

  return (
    <StyledProfileMenu>
      <StyledCenteredColumn spacing={2}>
        <Typography>Your balance: {userData.balance} Eur</Typography>
        <JustValueTextField label="Enter amount" setValue={setEnteredAmount} />
        <SubmitButton
          text="Add money"
          onClick={() => dispatch(addBalance(enteredAmount))}
        />
        <Typography>Username: {userData.userName} </Typography>
        <Typography>Name: {userData.name} </Typography>
        <Typography>Surname: {userData.surname} </Typography>
        <Typography>Email: {userData.email} </Typography>
        <Typography>Phone number: {userData.phoneNumber} </Typography>
      </StyledCenteredColumn>
    </StyledProfileMenu>
  );
}

export default UserData;
