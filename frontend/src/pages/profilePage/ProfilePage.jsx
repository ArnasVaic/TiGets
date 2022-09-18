import { Button, Typography } from "@mui/material";
import { Stack } from "@mui/system";
import Ticket from "./components/Ticket";

function ProfilePage() {
  return (
    <div style={{ display: "flex", justifyContent: "space-between" }}>
      <Stack spacing={2} style={{ padding: "50px" }}>
        <Typography>Your balance</Typography>
        <Typography
          style={{
            border: "2px solid black",
            borderRadius: "5px",
            padding: "5px",
          }}
        >
          10.00
        </Typography>
        <Button variant="contained">Add money</Button>
      </Stack>
      <Stack spacing={2} style={{ padding: "50px" }}>
        <Typography>Your tickets</Typography>
        <Ticket onTheMarket={true} />
        <Ticket onTheMarket={true} />
        <Ticket onTheMarket={false} />
        <Ticket onTheMarket={false} />
      </Stack>
    </div>
  );
}

export default ProfilePage;
