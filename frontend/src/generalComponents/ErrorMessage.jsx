import { StyledErrorMessage } from "./styled/ErrorMessage.styled";

function ErrorMessage({ text }) {
  return <StyledErrorMessage severity="error">{text}</StyledErrorMessage>;
}

export default ErrorMessage;
