import { styled } from "@mui/material";
import { TICKET, TICKET_SHADOW } from '../../../constants';

export const StyledTicket = styled("div")`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  border: 1px solid black;
  padding: 10px;
  transition: background-color 500ms ease-out 0ms;
  box-shadow: 1px 3px 3px 1px ${TICKET_SHADOW};
  background-color: ${TICKET}
`;
