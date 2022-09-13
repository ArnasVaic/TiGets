import { Typography, Button} from "@mui/material";

function Ticket(props) {

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "row",
        border: "2px solid black",
        borderRadius: "5px",
        padding: "5px",
      }}
    >
      <Typography style={{ padding: "10px 50px" }}>Event name</Typography>
      <Typography style={{ padding: "10px 50px" }}>Address</Typography>
      <Typography style={{ padding: "10px 50px" }}>Date</Typography>

      {props.onTheMarket ? <Button variant="contained"> Take of the market</Button>
              : <Button variant="contained"> Sell </Button>}

    </div>
  );
}

export default Ticket;
