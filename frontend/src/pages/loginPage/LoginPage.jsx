import { Button, TextField, Typography } from "@mui/material";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate, useLocation } from "react-router-dom";
import { postLogin } from "../../services/loginService";
import sha256 from "sha256";

function LoginPage() {
  const [username, setUsername] = useState();
  const [password, setPassword] = useState();
  const [wrongPassword, setWrongPassword] = useState(false);
  const dispatch = useDispatch();

  const search = useLocation().search;
  const returnUrl = new URLSearchParams(search).get("ReturnUrl");
  const navigate = useNavigate();

  return (
    <div
      style={{ display: "flex", flexDirection: "column", padding: "10% 40%" }}
    >
      <Typography variant="h2" style={{ textAlign: "center" }}>
        TIGETS
      </Typography>
      <TextField
        label="username"
        onChange={(event) => {
          setUsername(event.target.value);
        }}
      />
      <TextField
        label="password"
        type="password"
        onChange={(event) => {
          setPassword(event.target.value);
        }}
      />
      <Button
        variant="contained"
        onClick={() => {
          dispatch(
            postLogin(
              username,
              sha256(password),
              returnUrl,
              navigate,
              setWrongPassword
            )
          );
        }}
      >
        Log in
      </Button>
      {wrongPassword && (
        <Typography color="red">Wrong username or password</Typography>
      )}
    </div>
  );
}

export default LoginPage;
