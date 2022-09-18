import { Button, Typography } from "@mui/material";
import {Link} from "react-router-dom"


function RegisterPage() {

    const LinkStyle = {
        color: 'black',
    };

    return (

      <div style={{ display: "flex", justifyContent: "space-between" }}>

          <h1>Register Page</h1>
            <Link style={LinkStyle} to='/profilePage'>
              <h2> Go to profile </h2>
            </Link>


      </div>

  );
} 

export default RegisterPage;
