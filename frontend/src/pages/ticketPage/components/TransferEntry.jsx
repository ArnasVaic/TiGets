import { StyledTransferEntry } from "./TransferEntry.style";

function TransferEntry({ ticketId, date, cost}) {

    return (
        <StyledTransferEntry>
          Date: {date}, cost: { cost} Eur
        </StyledTransferEntry>
    );
}

export default TransferEntry;