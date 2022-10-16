import { StyledSubmitButton } from "./styled/SubmitButton.styled";

function SubmitButton({ text, onClick }) {
  return (
    <StyledSubmitButton variant="contained" onClick={onClick}>
      {text}
    </StyledSubmitButton>
  );
}

export default SubmitButton;
