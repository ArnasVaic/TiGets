import { DARK_BUTTON, GREEN_BUTTON } from "../constants";
import { StyledSubmitButton } from "./styled/SubmitButton.styled";

function SubmitButton({ text, onClick }) {
  return (
    <StyledSubmitButton
      variant="contained"
      onClick={onClick}
      style={{ backgroundColor: DARK_BUTTON }}
    >
      {text}
    </StyledSubmitButton>
  );
}

export default SubmitButton;
