import { useNavigate } from "react-router-dom";
import { StyledNavigationButton } from "./styled/NavigationButton.styled";

function NavigationButton({ text, url }) {
  const navigate = useNavigate();
  return (
    <StyledNavigationButton
      style={{
        margin: "10px",
        position: "absolute",
        right: "0",
      }}
      variant="contained"
      onClick={() => navigate(url)}
    >
      {text}
    </StyledNavigationButton>
  );
}

export default NavigationButton;
