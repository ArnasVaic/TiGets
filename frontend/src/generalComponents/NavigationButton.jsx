import { Button } from "@mui/material";
import { useNavigate } from "react-router-dom";

function NavigationButton({ text, url }) {
  const navigate = useNavigate();
  return (
    <Button
      style={{
        margin: "10px",
        position: "absolute",
        right: "0",
      }}
      variant="contained"
      onClick={() => navigate(url)}
    >
      {text}
    </Button>
  );
}

export default NavigationButton;
