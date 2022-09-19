import { Stack } from "@mui/system";
import { Button, TextField, Typography } from "@mui/material";
import { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import SearchIcon from "@material-ui/icons/Search";
import InputAdornment from "@material-ui/core/InputAdornment";
import Ticket from "./components/Ticket";


function MarketPage() {

    const [searchInput, setSearchInput] = useState("");

    const navigate = useNavigate();

   // function inputHandler(e) {
   //     setSearchInput(e.target.value);
   // };

    return (

        <div style={{
            display: "flex",
            height: "100vh",
            width: "100 %",
            rowGap: "10px",
            justifyContent: "space-between" 
        }}>
            <Stack spacing={2} style={{padding: "2%", marginLeft: "20%"}}>

                <Typography style={{  }}> Find the ticket you are looking for!</Typography>

                <TextField
                    label="Search for event"
                    InputProps={{
                        endAdornment: <InputAdornment position="end">
                            <SearchIcon/>
                        </InputAdornment>,
                    }}
                /> 

                <Ticket name={"Name1"} />
                <Ticket name={"Name2"} />
                <Ticket name={"Name3"} />
                <Ticket name={"Name4"} />
                <Ticket name={"Name5"} />
                <Ticket name={"Name6"} />
                <Ticket name={"Name7"} />
                <Ticket name={"Name8"} />

            </Stack>

            <Stack spacing={2} style={{ padding: "10px" }}>
                <Button variant="contained"
                        onClick={() => {
                        navigate("/");
                    }}>
                Profile
                </Button>
            </Stack>

        </div>
    
    );


}

export default MarketPage;