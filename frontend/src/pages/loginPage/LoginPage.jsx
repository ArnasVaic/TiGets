import { Button, TextField, Typography } from "@mui/material";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { useParams } from "react-router-dom";
import { postLogin } from "../../services/loginService";

function LoginPage() {
  const [username, setUsername] = useState();
  const [password, setPassword] = useState();
  const dispatch = useDispatch();
  const { returnUrl } = useParams();

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
          dispatch(postLogin(username, password, returnUrl));
          console.log(
            `DEBUG: Calling https://localhost:7056/api/Account/login?Username=${username}&Password=${password}&ReturnUrl=${returnUrl}`
          );
        }}
      >
        Log in
      </Button>
    </div>
  );
}

export default LoginPage;
