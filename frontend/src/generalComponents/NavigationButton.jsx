import { useNavigate } from "react-router-dom";
import { GREEN_BUTTON } from '../constants';
import { StyledNavigationButton } from "./styled/NavigationButton.styled";

function NavigationButton({ text, url }) {
  const navigate = useNavigate();
  return (
    <StyledNavigationButton
      variant="contained"
      onClick={() => navigate(url)}
      style={{ backgroundColor: GREEN_BUTTON }}
    >
      {text}
    </StyledNavigationButton>
  );
}

export default NavigationButton;
