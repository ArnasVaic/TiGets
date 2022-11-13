import Header from "../../generalComponents/Header";
import { PROFILE_URL } from "../../constants";
import { StyledCenteredColumn } from "../../generalComponents/styled/CenteredColumn.styled";
import { StyledTitle } from "../../generalComponents/styled/Title.styled";
import { selectTransfers } from "../../slices/ticketSlice";
import { useSelector } from "react-redux";
import TransferEntry from "./components/TransferEntry";

function TicketPage() {
    const transfers = useSelector(selectTransfers);

    return (
        <>
        <Header navigateText="Profile" url={PROFILE_URL} />
        <StyledCenteredColumn spacing={2} style={{
                backgroundColor: "#F6FAFF",
            }}>
        <StyledTitle>Ticket purchase history</StyledTitle>
                {transfers.map((transfer, index) => (
                    <TransferEntry
                        key={index}
                        ticketId={transfer.id}
                        date={transfer.date}
                    />
                ))}
        </StyledCenteredColumn>
        </>
    );
}

export default TicketPage;
