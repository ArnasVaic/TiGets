import { PROFILE_URL } from "../../constants";
import { selectMarketTickets } from "../../slices/marketSlice";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { getMarketTickets } from "../../services/marketService";
import Ticket from "./components/Ticket";
import { StyledCenteredColumn } from "../../generalComponents/styled/CenteredColumn.styled";
import { StyledTitle } from "../../generalComponents/styled/Title.styled";
import Header from "../../generalComponents/Header";
import JustValueTextField from "../../generalComponents/JustValueTextField";
import ErrorMessage from "../../generalComponents/ErrorMessage";
import { Alert } from '@mui/material';

function MarketPage() {
  const tickets = useSelector(selectMarketTickets);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getMarketTickets());
  }, [dispatch]);
  const [search, setSearch] = useState("");
  const [errMsg, setErrMsg] = useState();
  const [succMsg, setSuccMsg] = useState();

  return (
    <>
      <Header navigateText="Profile" url={PROFILE_URL} />
      <StyledCenteredColumn spacing={2}>
        <StyledTitle>TIGETS Market</StyledTitle>
        <JustValueTextField label="Search event.." setValue={setSearch} />
        {errMsg && <ErrorMessage text={errMsg} />}
        {succMsg && <Alert severity="success">{succMsg}</Alert> }
        {tickets
          .filter((ticket) => {
            if (search === "") {
              return ticket;
            } else if (
              ticket.eventName.toLowerCase().includes(search.toLowerCase())
            )
              return ticket;
          })
          .map((ticket, index) => (
            <Ticket
              key={index}
              setErrMsg={setErrMsg}
              setSuccMsg={setSuccMsg}
              ticketId={ticket.id}
              eventName={ticket.eventName}
              address={ticket.address}
              validFrom={ticket.validFrom.slice(0, 10)}
              validTo={ticket.validTo.slice(0, 10)}
              cost={ticket.cost}
            />
          ))}
      </StyledCenteredColumn>
    </>
  );
}

export default MarketPage;
