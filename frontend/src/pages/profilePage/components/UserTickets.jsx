import { Alert, Typography } from "@mui/material";
import { useSelector } from "react-redux";
import { BACKGROUND } from "../../../constants";
import ErrorMessage from "../../../generalComponents/ErrorMessage";
import { StyledCenteredColumn } from "../../../generalComponents/styled/CenteredColumn.styled";
import { StyledText } from "../../../generalComponents/styled/Text.styled";
import {
  selectErrorMessage,
  selectSuccessMessage,
  selectUserTickets,
} from "../../../slices/profileSlice";
import Ticket from "./Ticket";
import { StyledUserTickets } from "./UserTickets.styled";

function UserTickets() {
  const tickets = useSelector(selectUserTickets);
  const errMsg = useSelector(selectErrorMessage);
  const succMsg = useSelector(selectSuccessMessage);

  return (
    <StyledUserTickets style={{ backgroundColor: BACKGROUND }}>
      <StyledText
        variant="h4"
        style={{
          textAlign: "center",
          paddingTop: "50px",
          paddingBotton: "50px",
        }}
      >
        Your tickets
      </StyledText>
      <StyledCenteredColumn style={{ paddingTop: "50px" }} spacing={2}>
        {errMsg && <ErrorMessage text={errMsg} />}
        {succMsg && <Alert severity="success">{succMsg}</Alert>}
        {tickets.map((ticket, index) => (
          <Ticket
            key={index}
            isOffMarket={ticket.state === 1}
            ticketId={ticket.id}
            eventName={ticket.eventName}
            address={ticket.address}
            validFrom={ticket.validFrom.slice(0, 10)}
            validTo={ticket.validTo.slice(0, 10)}
            cost={ticket.cost}
          />
        ))}
      </StyledCenteredColumn>
    </StyledUserTickets>
  );
}

export default UserTickets;
