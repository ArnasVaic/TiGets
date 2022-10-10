import { PROFILE_URL } from "../../constants";
import { StyledTicket } from "../../generalComponents/styled/Ticket.styled";
import { StyledTitle } from "../../generalComponents/styled/Title.styled";
import { StyledCenteredColumn } from "../../generalComponents/styled/CenteredColumn.styled";
import {
  selectMarketTickets,
  //setMarketTickets,
} from "../../slices/marketSlice";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { StyledNavigationButton } from "../../generalComponents/styled/NavigationButton.styled";
import { getMarketTickets } from "../../services/marketService";

function MarketPage() {
  const tickets = useSelector(selectMarketTickets);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getMarketTickets());
    /*dispatch(
      setMarketTickets([
        {
          id: "1",
          userId: "0",
          state: "0",
          validFrom: "2022-10-10T15:33:45.591",
          validTo: "2023-12-12T23:33:22.443",
          eventName: "Pasnekesiai",
          address: "Verkiu 1",
          cost: "10",
        },
        {
          id: "2",
          userId: "0",
          state: "0",
          validFrom: "2022-10-10T15:33:45.591",
          validTo: "2023-12-12T23:33:22.443",
          eventName: "Fejerverkai",
          address: "Nebeverkiu 1",
          cost: "69",
        },
        {
          id: "3",
          userId: "0",
          state: "0",
          validFrom: "2022-10-10T15:33:45.591",
          validTo: "2023-12-12T23:33:22.443",
          eventName: "Galapagai",
          address: "Anyksciai",
          cost: "15",
        },
        {
          id: "4",
          userId: "0",
          state: "0",
          validFrom: "2022-10-10T15:33:45.591",
          validTo: "2023-12-12T23:33:22.443",
          eventName: "Troliu pica",
          address: "Miskenai",
          cost: "12.24",
        },
      ])
    );*/
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
