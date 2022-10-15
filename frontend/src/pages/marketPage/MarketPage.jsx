import { PROFILE_URL } from "../../constants";
import { StyledTicket } from "../../generalComponents/styled/Ticket.styled";
import { StyledTitle } from "../../generalComponents/styled/Title.styled";
import { StyledCenteredColumn } from "../../generalComponents/styled/CenteredColumn.styled";
import { selectMarketTickets } from "../../slices/marketSlice";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { StyledNavigationButton } from "../../generalComponents/styled/NavigationButton.styled";
import { getMarketTickets } from "../../services/marketService";

function MarketPage() {
  const tickets = useSelector(selectMarketTickets);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getMarketTickets());
  }, [dispatch]);

  return (
    <>
      <StyledNavigationButton text="Profile" url={PROFILE_URL} />
      <StyledCenteredColumn spacing={2}>
        <StyledTitle>TIGETS Market</StyledTitle>
        {tickets.map((ticket, index) => (
          <StyledTicket
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
