import React from "react";
import { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useEffect } from "react";
import { Button, Typography, TextField } from "@mui/material"; 
import { increaseBalanceBy, selectBalance } from "../../slices/profileSlice";
import { selectMarketTickets } from "../../slices/marketSlice";
import NavigationButton from "../../generalComponents/NavigationButton";
import LogoutButton from "../../generalComponents/LogoutButton";
import JustValueTextField from "../../generalComponents/JustValueTextField";
import { StyledCenteredColumn } from "../../generalComponents/styled/CenteredColumn.styled";
import { StyledTitle } from "../../generalComponents/styled/Title.styled";
import Ticket from "./components/Ticket";
import { addBalance } from "../../services/profileService";
import { StyledProfilePage } from "./components/ProfilePage.styled.jsx";
import { StyledProfileMarket } from "./components/ProfileMarket.styled.jsx";
import { StyledProfileHeader } from "./components/ProfileHeader.styled.jsx";
import { StyledProfileMenu } from "./components/ProfileMenu.styled.jsx";



function ProfilePage() {
const [addedMoney, setAddedMoney] = useState();
const profile = useSelector((state) => state.profile);
const dispatch = useDispatch();
const tickets = useSelector(selectMarketTickets);

return (

    <StyledProfilePage>

        <StyledProfileHeader>
            <LogoutButton />
            <NavigationButton text="Market" url={'/market'} />
        </StyledProfileHeader>

       <StyledProfileMenu>

            <StyledCenteredColumn spacing={2}>
                <Typography style={{ textAlign: "center", marginTop: 30 }}>Your balance is {profile.balance}</Typography>
                <JustValueTextField label="add money" setValue={setAddedMoney}> </JustValueTextField>

                <Button
                    variant="contained"
                    onClick={() => dispatch(addBalance(addedMoney))}
                >
                    Add money
                </Button>

         </StyledCenteredColumn>

        </StyledProfileMenu>

        <StyledProfileMarket>                                        
            <StyledCenteredColumn spacing={2}>
                <StyledTitle>TIGETS profile</StyledTitle>
                <Typography style={{ textAlign: "center", marginTop: 10 }}>Your tickets</Typography>
                <Button>HELLO IM A TICKET</Button>
                <Button>HELLO IM A TICKET</Button>
                <Button>HELLO IM A TICKET</Button>

            </StyledCenteredColumn>
        </StyledProfileMarket>

    </StyledProfilePage>

 );

}

export default ProfilePage;
