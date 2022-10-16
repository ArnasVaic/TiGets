import { PROFILE_URL } from "../../constants";
import { selectMarketTickets } from "../../slices/marketSlice";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { getMarketTickets } from "../../services/marketService";
import Ticket from "./components/Ticket";
import { StyledCenteredColumn } from "../../generalComponents/styled/CenteredColumn.styled";
import { StyledTitle } from "../../generalComponents/styled/Title.styled";
import Header from "../../generalComponents/Header";

function MarketPage() {
  const tickets = useSelector(selectMarketTickets);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getMarketTickets());
  }, [dispatch]);

  return (
    <>
      <Header navigateText="Profile" url={PROFILE_URL} />
      <StyledCenteredColumn spacing={2}>
        <StyledTitle>TIGETS Market</StyledTitle>
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
    </>
  );
}

export default MarketPage;
