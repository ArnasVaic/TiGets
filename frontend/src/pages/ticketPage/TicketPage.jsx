import Header from "../../generalComponents/Header";
import { PROFILE_URL } from "../../constants";
import { StyledCenteredColumn } from "../../generalComponents/styled/CenteredColumn.styled";
import { StyledTitle } from "../../generalComponents/styled/Title.styled";
import { selectTransfers } from "../../slices/ticketSlice";
import { useSelector, useDispatch } from "react-redux";
import TransferEntry from "./components/TransferEntry";
import { useParams } from 'react-router-dom';
import { getTransfers } from "../../services/ticketService";
import { useEffect, useState } from "react";

function TicketPage() { 

    const ticketId = useParams(); 
    const string = String(ticketId[Object.keys(ticketId)[0]])
    const transfers = useSelector(selectTransfers);
    const dispatch = useDispatch();;
    useEffect(() => {
        console.log(transfers);
        dispatch(getTransfers(string));
    }, [dispatch]);
    
    return (
        <>
        <Header navigateText="Profile" url={PROFILE_URL} />
        <StyledCenteredColumn spacing={2} >
                <StyledTitle>Ticket purchase history</StyledTitle>
                {transfers.map((transfer, index) => (
                     <TransferEntry
                        key={index}
                        ticketId={transfer.ticketId}
                        date={transfer.time.slice(0, 10)}
                        cost={transfer.cost}
                      />
                  ))
                }
        </StyledCenteredColumn>
        </>
    );
}

export default TicketPage;

