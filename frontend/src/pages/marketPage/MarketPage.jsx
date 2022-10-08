import { useNavigate } from "react-router-dom";
import { PROFILE_URL } from "../../constants";
import { StyledTicket } from "../../generalComponents/styled/Ticket.styled";
import { StyledSubmitButton } from "../../generalComponents/styled/SubmitButton.styled";
import { StyledTitle } from "../../generalComponents/styled/Title.styled";
import { StyledCenteredColumn } from "../../generalComponents/styled/CenteredColumn.styled";
import { selectMarketTickets } from "../../slices/marketSlice";
import { useSelector } from "react-redux";

function MarketPage() {
  const navigate = useNavigate();
  const tickets = useSelector(selectMarketTickets);

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
