import { Typography } from "@mui/material";
import { useSelector } from "react-redux";
import { StyledCenteredColumn } from "../../../generalComponents/styled/CenteredColumn.styled";
import { selectUserTickets } from "../../../slices/profileSlice";
import Ticket from "./Ticket";
import { StyledUserTickets } from "./UserTickets.styled";

function UserTickets() {
  const tickets = useSelector(selectUserTickets);

  return (
    <StyledUserTickets>
      <StyledCenteredColumn spacing={2}>
      <Typography style={{textAlign: "center"} } variant = "h6" >Your tickets</Typography>
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
