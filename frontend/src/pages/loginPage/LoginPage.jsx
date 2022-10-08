import { useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate, useLocation } from "react-router-dom";
import { postLogin } from "../../services/loginService";
import { StyledCenteredColumn } from "../../generalComponents/styled/CenteredColumn.styled";
import { StyledJustValueTextField } from "../../generalComponents/styled/JustValueTextField.styled";
import { StyledTitle } from "../../generalComponents/styled/Title.styled";
import { StyledErrorMessage } from "../../generalComponents/styled/ErrorMessage.styled";
import { StyledSubmitButton } from "../../generalComponents/styled/SubmitButton.styled";
import { Typography, Link } from "@mui/material";
import { REGISTER_URL } from "../../constants";

function LoginPage() {
  const [username, setUsername] = useState();
  const [password, setPassword] = useState();
  const [wrongPassword, setWrongPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();

  const search = useLocation().search;
  const returnUrl = new URLSearchParams(search).get("ReturnUrl");
  const navigate = useNavigate();

  return (
    <>
      <StyledTitle>TIGETS</StyledTitle>
      <StyledCenteredColumn>
        <StyledJustValueTextField label="username" setValue={setUsername} />
        <StyledJustValueTextField
          label="password"
          type="password"
          setValue={setPassword}
        />
        <StyledSubmitButton
          text="Log in"
          onClick={() => {
            dispatch(
              postLogin(
                username,
                password,
                returnUrl,
                navigate,
                setWrongPassword,
                setLoading
              )
            );
          }}
        />
        {wrongPassword && (
          <StyledErrorMessage>Wrong username or password</StyledErrorMessage>
        )}
        {loading && <Typography>Loading...</Typography>}
        <Link href={REGISTER_URL}>New to TiGets? Create an account.</Link>
      </StyledCenteredColumn>
    </>
  );
}

export default LoginPage;
