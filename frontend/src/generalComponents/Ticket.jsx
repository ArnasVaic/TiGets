import { Typography, Button } from "@mui/material";
import { useState } from "react";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";

function Ticket({ name, address, date, price }) {
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

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
      <Typography style={{ padding: "10px 50px" }}>{name}</Typography>
      <Typography style={{ padding: "10px 50px" }}>{address}</Typography>
      <Typography style={{ padding: "10px 50px" }}>{date}</Typography>
      <Typography style={{ padding: "10px 50px" }}>{price}</Typography>

      <Button variant="contained" onClick={handleClick}>
        {" "}
        Buy{" "}
      </Button>

      <Menu
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        anchorOrigin={{
          vertical: "top",
          horizontal: "left",
        }}
        transformOrigin={{
          vertical: "top",
          horizontal: "left",
        }}
      >
        <MenuItem onClick={handleClose}>Buy</MenuItem>
        <MenuItem onClick={handleClose}>Cancel</MenuItem>
      </Menu>
    </div>
  );
}

export default Ticket;
