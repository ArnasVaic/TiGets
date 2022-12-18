import { Grid, styled } from "@mui/material";
import { TICKET, TICKET_SHADOW } from "../../../constants";

export const StyledTransferEntry = styled(Grid)`
  display: flex;
  flex-direction: row;
  justify-content: space-evenly;
  align-items: center;
  border: 1px solid black;
  padding: 10px;
  border-radius: 0px;
  box-shadow: 3px 1px 3px 1px ${TICKET_SHADOW};
  background-color: ${TICKET};
`;
