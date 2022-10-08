import { Stack } from "@mui/system";
import { TextField, Typography } from "@mui/material";
import { useNavigate } from "react-router-dom";
import SearchIcon from "@material-ui/icons/Search";
import InputAdornment from "@material-ui/core/InputAdornment";
import { PROFILE_URL } from "../../constants";
import { StyledTicket } from "../../generalComponents/styled/Ticket.styled";
import { StyledSubmitButton } from "../../generalComponents/styled/SubmitButton.styled";

function MarketPage() {
  const navigate = useNavigate();

  return (
    <div
      style={{
        display: "flex",
        height: "100vh",
        width: "100 %",
        rowGap: "10px",
        justifyContent: "space-between",
      }}
    >
      <Stack spacing={2} style={{ padding: "2%", marginLeft: "20%" }}>
        <Typography>Find the ticket you are looking for!</Typography>

        <TextField
          label="Search for event"
          InputProps={{
            endAdornment: (
              <InputAdornment position="end">
                <SearchIcon />
              </InputAdornment>
            ),
          }}
        />

        <StyledTicket name={"Name1"} />
        <StyledTicket name={"Name2"} />
        <StyledTicket name={"Name3"} />
        <StyledTicket name={"Name4"} />
        <StyledTicket name={"Name5"} />
        <StyledTicket name={"Name6"} />
        <StyledTicket name={"Name7"} />
        <StyledTicket name={"Name8"} />
      </Stack>

      <Stack spacing={2} style={{ padding: "10px" }}>
        <StyledSubmitButton
          text="Profile"
          onClick={() => {
            navigate(PROFILE_URL);
          }}
        />
      </Stack>
    </div>
  );
}

export default MarketPage;
