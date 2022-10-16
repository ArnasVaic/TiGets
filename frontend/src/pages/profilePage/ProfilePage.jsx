import React from "react";
import { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useEffect } from "react";
import { Button, Typography } from "@mui/material"; 
import { increaseBalanceBy } from "../../slices/profileSlice";
import { selectMarketTickets } from "../../slices/marketSlice";
import { getMarketTickets } from "../../services/marketService";
import NavigationButton from "../../generalComponents/NavigationButton";
import LogoutButton from "../../generalComponents/LogoutButton";
import JustValueTextField from "../../generalComponents/JustValueTextField";
import { StyledCenteredColumn } from "../../generalComponents/styled/CenteredColumn.styled";
import { StyledTitle } from "../../generalComponents/styled/Title.styled";
import Ticket from "./components/Ticket";

function ProfilePage() {
const [addedMoney, setAddedMoney] = useState();
const profile = useSelector((state) => state.profile);
const dispatch = useDispatch();
const tickets = useSelector(selectMarketTickets);

return (

    <div style={{ border: "1",   //page 
                margin: "0",
                padding: "5",
                position: "relative"
    }} >
        <div style={{           //header
            width: 1500,
            height: 65,
            border: 2,
            backgroundColor: '#f0f8ff',
            textAlign: "center"
        }} >
            <LogoutButton />
            <NavigationButton text="Market" url={'/market'} />
        </div> 

        <div style={{           //userInfo
            backgroundColor: '#4682b4',
            width: 250,
            float: "left",
            height: 700
        }}
        >

            <StyledCenteredColumn spacing={2}>
                <Typography style={{textAlign: "center", marginTop:30} }>Your balance</Typography>
                <JustValueTextField label="Add money" setValue={setAddedMoney} />

                <Button
                    variant="contained"
                    onClick={() => dispatch(increaseBalanceBy(1))}
                >
                    Add money
                </Button>
         </StyledCenteredColumn>

        </div>

        <div>                                        
            <StyledCenteredColumn spacing={2}>
                <StyledTitle>TIGETS profile</StyledTitle>
                <Typography style={{ textAlign: "center", marginTop: 10 }}>Your tickets</Typography>
                <Button>HELLO IM A TICKET</Button>
                <Button>HELLO IM A TICKET</Button>
                <Button>HELLO IM A TICKET</Button>

                {tickets.map((ticket, index) => (
                    <Ticket
                        key={index}
                        ticketId={ticket.id}
                        eventName={ticket.eventName}
                        address={ticket.address}
                        validFrom={ticket.validFrom.slice(0, 10)}
                        validTo={ticket.validTo.slice(0, 10)}
                        cost={ticket.cost}
                    />
                ))}

            </StyledCenteredColumn>
        </div>

         
    </div>

 );

}

export default ProfilePage;
