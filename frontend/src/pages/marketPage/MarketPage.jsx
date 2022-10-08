import { useNavigate } from "react-router-dom";
import { PROFILE_URL } from "../../constants";
import { StyledTicket } from "../../generalComponents/styled/Ticket.styled";
import { StyledSubmitButton } from "../../generalComponents/styled/SubmitButton.styled";
import { StyledTitle } from "../../generalComponents/styled/Title.styled";
import { StyledCenteredColumn } from "../../generalComponents/styled/CenteredColumn.styled";

function MarketPage() {
  const navigate = useNavigate();

  return (
    <StyledCenteredColumn>
      <StyledTitle>TIGETS Market</StyledTitle>
      <StyledTicket name={"Name1"} />
      <StyledTicket name={"Name2"} />
      <StyledTicket name={"Name3"} />
      <StyledTicket name={"Name4"} />
      <StyledTicket name={"Name5"} />
      <StyledTicket name={"Name6"} />
      <StyledTicket name={"Name7"} />
      <StyledTicket name={"Name8"} />
      <StyledSubmitButton
        text="Profile"
        onClick={() => {
          navigate(PROFILE_URL);
        }}
      />
    </StyledCenteredColumn>
  );
}

export default MarketPage;
