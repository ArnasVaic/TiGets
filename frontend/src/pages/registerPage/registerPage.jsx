import { TextField, Typography, Button } from "@mui/material";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { useParams } from "react-router-dom";
//import { postRegister } from "../../services/registerService";
import { useNavigate, useLocation } from "react-router-dom";
import Alert from '@mui/material/Alert';



import InputAdornment from "@material-ui/core/InputAdornment";
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import IconButton from '@mui/material/IconButton';


function RegisterPage() {

    const [username, setUsername] = useState('');
    const[password, setPassword] = useState('');
    const [cPassword, setCPassword] = useState('');
    const [showErrorMessage, setShowErrorMessage] = useState();
   // const { returnUrl } = useParams();
    const navigate = useNavigate();

    function checkValidation(){
        if (password !== cPassword)
            setShowErrorMessage(true)
        else setShowErrorMessage(false);
    }

    return (

     <div>
      
        <div
            style={{ display: "flex", flexDirection: "column", padding: "10% 40%" }}
         >
            <Typography variant="h2" style={{ textAlign: "center" }}>
                TIGETS
            </Typography>

            <TextField
                label="Username"
                onChange={(event) => {
                    setUsername(event.target.value);
                }}
            />

            <TextField
                label="Password"
                type="password"
                onChange={(event) => {
                    setPassword(event.target.value);
                }}
            />

            <TextField
                label="Confirm password"
                type="password"

                onChange={(event) => {
                    setCPassword(event.target.value);
                }}

             />


            <div>
                    {showErrorMessage ? <Alert sx={{
                        mt: 1 // margint top
                    }}
                        severity="error"> Passwords must match </Alert>
                  : ''}
            </div>

            <div style={{ display: "flex", flexDirection: "column", padding: "2% 0%" }} >

            <Button
               variant="contained"
               
                onClick={() => {
                    if (password == cPassword) {
                        checkValidation();
                     //     dispatch(postRegister(username, password, returnUrl)
                    }
                    else {
                        checkValidation();
                    }
               }}
             >
                Register
                    </Button>

                    <Typography style={{ textAlign: "center", marginTop: "10px", textDecorationLine: 'underline' }}
                        onClick={() => {
                            navigate("/");
                        }}
             >
                 Already have and account? Log in.
            </Typography>


            </div>

         </div>

      </div>
    );
}

export default RegisterPage;
