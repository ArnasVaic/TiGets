import { useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { postRegister } from "../../services/registerService";
import { Typography, Button, Link } from "@mui/material";
import Alert from "@mui/material/Alert";
import { LOGIN_URL } from "../../constants";
import JustValueTextField from "../../generalComponents/JustValueTextField";
import { StyledTitle } from "../../generalComponents/styled/Title.styled";
import { StyledCenteredColumn } from "../../generalComponents/styled/CenteredColumn.styled";
import { LOGIN_URL } from '../../constants';
import { getInfo } from "../../services/registerService";

function RegisterPage() {
  const [userName, setUsername] = useState();
  const [password, setPassword] = useState();
  const [cPassword, setCPassword] = useState();
  const [name, setName] = useState();
  const [surname, setSurname] = useState();
  const [email, setEmail] = useState();
  const [phoneNumber, setPhoneNumber] = useState();

    const [isError, setIsError] = useState(false);
    const [errorMsg, setErrorMsg] = useState();
    const [loading, setLoading] = useState(false);
    const [infoAlert, setInfoAlert] = useState(false);
    const [information, setInformation] = useState('');

  const dispatch = useDispatch();
  const navigate = useNavigate();

  function checkValidation() {
    if (password !== cPassword) {
      setIsError(true);
      setErrorMsg("Passwords do not match!");
    } else {
      setIsError(false);
    }
  }

  function handleData() {
    const dataObject = {
      userName,
      password,
      name,
      surname,
      email,
      phoneNumber,
    };
    if (password === cPassword)
      dispatch(
        postRegister(dataObject, navigate, setErrorMsg, setIsError, setLoading)
      );
  }

  return (
    <>
      <StyledTitle>TIGETS</StyledTitle>
      <StyledCenteredColumn>
        <JustValueTextField label="userName" setValue={setUsername} />
        <JustValueTextField
          label="password"
          type="password"
          setValue={setPassword}
        />
        <JustValueTextField
          label="confirm password"
          type="password"
          setValue={setCPassword}
        />
        <JustValueTextField label="name" setValue={setName} />
        <JustValueTextField label="surname" setValue={setSurname} />
        <JustValueTextField label="email" setValue={setEmail} />
        <JustValueTextField label="phone number" setValue={setPhoneNumber} />

        <div>
          {isError ? (
            <Alert sx={{ mt: 1, marginBottom: 1 }} severity="error">
              {errorMsg}
            </Alert>
          ) : (
            ""
          )}
        </div>

                <Button
                    variant="contained"
                    onClick={() => {
                        checkValidation();
                        if (!isError) {
                            handleData();
                        }
                    }}
                >
                    Register
                </Button>
                {loading && <Typography style={{textAlign: "center"}}>Loading...</Typography>}
                <Typography
                    style={{
                        textAlign: "center",
                        marginTop: "10px",
                        textDecorationLine: "underline",
                    }}
                    onClick={() => {
                        navigate('/login');
                    }}
                >
                    Already have and account? Log in.
                </Typography>

                <Button
                    variant="contained"
                    style={{
                        backgroundColor: '#f0f8ff',
                        color: '#4682b4',
                    }}
                    onClick={() => {
                        dispatch(
                           getInfo(setInfoAlert, setInformation));
                    }}
                >
                    App information
                </Button>
           
                {infoAlert && <Alert severity="info">{information}</Alert>}
           
            </StyledCenteredColumn>
        </>
    );
}

export default RegisterPage;
