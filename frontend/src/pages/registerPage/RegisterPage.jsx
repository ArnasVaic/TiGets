import { useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate, useLocation } from "react-router-dom";
import { postRegister } from "../../services/registerService";
import { StyledCenteredColumn } from "../../generalComponents/styled/CenteredColumn.styled";
import { StyledJustValueTextField } from "../../generalComponents/styled/JustValueTextField.styled";
import { StyledTitle } from "../../generalComponents/styled/Title.styled";
import { StyledErrorMessage } from "../../generalComponents/styled/ErrorMessage.styled";
import { StyledSubmitButton } from "../../generalComponents/styled/SubmitButton.styled";
import { Typography, Button } from "@mui/material";
import Alert from "@mui/material/Alert";


function RegisterPage() {
    const [userName, setUsername] = useState();
    const [password, setPassword] = useState();
    const [cPassword, setCPassword] = useState();
    const [wrongPassword, setWrongPassword] = useState(false);
    const [isError, setIsError] = useState();
    const [errorMsg, setErrorMsg] = useState("Passwords do not match");

    const [name, setName] = useState();
    const [surname, setSurname] = useState();
    const [email, setEmail] = useState();
    const [phoneNumber, setPhoneNumber] = useState();

    const dispatch = useDispatch();
    const search = useLocation().search;
    const returnUrl = new URLSearchParams(search).get("ReturnUrl");
    const navigate = useNavigate();

    function checkValidation() {
        if (password !== cPassword) {
            setIsError(true);
            return true;
        }
        else {
            setIsError(false);
            return false;
        }
    }

    function handleData() {
        const dataObject = { userName, password, name, surname, email, phoneNumber };
        dispatch(postRegister(dataObject, navigate, returnUrl));
    }

    return (
        <>
            <StyledTitle>TIGETS</StyledTitle>
            <StyledCenteredColumn>
                <StyledJustValueTextField label="userName" setValue={setUsername} />
                <StyledJustValueTextField
                    label="password"
                    type="password"
                    setValue={setPassword}
                />
                <StyledJustValueTextField
                    label="confirm password"
                    type="password"
                    setValue={setCPassword}
                />
                <StyledJustValueTextField
                    label="name"
                    setValue={setName}
                />
                <StyledJustValueTextField
                    label="surname"
                    setValue={setSurname}
                />
                <StyledJustValueTextField
                    label="email"
                    setValue={setEmail}
                />
                <StyledJustValueTextField
                    label="phone number"
                    setValue={setPhoneNumber}
                />

                <div>
                    {isError ? (
                        <Alert sx={{ mt: 1, marginBottom: 1 }} severity="error" >
                            {errorMsg}
                        </Alert>
                    ) : ( "" )}
                </div>

                <Button
                    variant="contained"
                    onClick={() => {
                        checkValidation()
                        if (!isError) {
                            handleData();
                        }
                    }}
                >
                    Register
                </Button>

                <Typography
                    style={{
                        textAlign: "center",
                        marginTop: "10px",
                        textDecorationLine: "underline",
                    }}
                    onClick={() => {
                        navigate("/login");
                    }}
                >
                    Already have and account? Log in.
                </Typography>

            </StyledCenteredColumn>
        </>
    );
}

export default RegisterPage;
