import { useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate, useLocation } from "react-router-dom";
import { postLogin } from "../../services/loginService";
import { Typography, Link } from "@mui/material";
import { REGISTER_URL } from "../../constants";
import JustValueTextField from "../../generalComponents/JustValueTextField";
import SubmitButton from "../../generalComponents/SubmitButton";
import { StyledCenteredColumn } from "../../generalComponents/styled/CenteredColumn.styled";
import { StyledTitle } from "../../generalComponents/styled/Title.styled";
import { StyledLinearProgress } from "../../generalComponents/styled/LinearProgress.styled";
import ErrorMessage from "../../generalComponents/ErrorMessage";


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
      <StyledCenteredColumn style={{ padding: "10% 40%" }}>
        <StyledTitle>TIGETS</StyledTitle>
        <JustValueTextField label="username" setValue={setUsername} />
        <JustValueTextField
          label="password"
          type="password"
          setValue={setPassword}
        />
        <SubmitButton
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
        {wrongPassword && <ErrorMessage text="Wrong username or password" />}
        {loading && <StyledLinearProgress />}
        <Link style={{ textAlign: "center" }} href={REGISTER_URL}>
          New to TiGets? Create an account.
        </Link>
      </StyledCenteredColumn>
    </>
  );
}

export default LoginPage;
