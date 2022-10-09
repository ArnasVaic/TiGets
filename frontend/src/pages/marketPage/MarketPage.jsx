import { useNavigate } from "react-router-dom";
import { PROFILE_URL } from "../../constants";
import { StyledTicket } from "../../generalComponents/styled/Ticket.styled";
import { StyledSubmitButton } from "../../generalComponents/styled/SubmitButton.styled";
import { StyledTitle } from "../../generalComponents/styled/Title.styled";
import { StyledCenteredColumn } from "../../generalComponents/styled/CenteredColumn.styled";
import {
  selectMarketTickets,
  setMarketTickets,
} from "../../slices/marketSlice";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";

function MarketPage() {
  const navigate = useNavigate();
  const tickets = useSelector(selectMarketTickets);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(
      setMarketTickets([
        {
          id: "1",
          name: "Pasnekesiai",
          address: "Verkiu 1",
          date: "2022-10-10",
          price: "10",
        },
        {
          id: "2",
          name: "Fejerverkai",
          address: "Nebeverkiu 1",
          date: "2050-12-12",
          price: "69",
        },
        {
          id: "3",
          name: "Galapagai",
          address: "Anyksciai",
          date: "2027-10-10",
          price: "15",
        },
        {
          id: "4",
          name: "Troliu pica",
          address: "Miskenai",
          date: "2022-12-23",
          price: "12.24",
        },
      ])
    );
  }, []);

  return (
    <StyledCenteredColumn>
      <StyledSubmitButton
        text="Profile"
        onClick={() => {
          navigate(PROFILE_URL);
        }}
      />
      <StyledTitle>TIGETS Market</StyledTitle>
      {tickets.map((ticket, index) => (
        <StyledTicket
          key={index}
          ticketId={ticket.id}
          name={ticket.name}
          address={ticket.address}
          date={ticket.date}
          price={ticket.price}
        />
      ))}
    </StyledCenteredColumn>
  );
}

export default MarketPage;
