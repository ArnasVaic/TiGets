import { TextField, Typography, Button } from "@mui/material";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { useParams } from "react-router-dom";
//import { postRegister } from "../../services/registerService";

function RegisterPage() {

    const [username, setUsername] = useState('');
    const[password, setPassword] = useState('');
    const [cPassword, setCPassword] = useState('');
    const [showErrorMessage, setShowErrorMessage] = useState('');
   // const { returnUrl } = useParams();

    function checkValidation(){
        if (password !== cPassword)
            setShowErrorMessage("Passwords must match")
        else setShowErrorMessage('');
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
                {showErrorMessage}
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

            </div>

         </div>

      </div>
    );
}

export default RegisterPage;
