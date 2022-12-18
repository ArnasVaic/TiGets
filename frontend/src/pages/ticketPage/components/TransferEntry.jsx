import { Grid } from "@mui/material";
import { StyledText } from "../../../generalComponents/styled/Text.styled";
import { StyledTransferEntry } from "./TransferEntry.style";

function TransferEntry({ ticketId, date, cost }) {
  return (
    <StyledTransferEntry container>
      <Grid item xs={6}>
        <StyledText>When: {date}</StyledText>
      </Grid>
      <Grid item xs={6}>
        <StyledText> Price: {cost} Eur</StyledText>
      </Grid>
    </StyledTransferEntry>
  );
}

export default TransferEntry;
