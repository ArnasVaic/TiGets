import { Button, Typography } from "@mui/material";
import { Stack } from "@mui/system";
import Ticket from "./components/Ticket";
import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux'
import {increaseBalanceBy } from '../../slices/profileSlice'



function ProfilePage() {

    const profile = useSelector(state => state.profile);
    const dispatch = useDispatch();

    return (
    <div style={{ display: "flex", justifyContent: "space-between" }}>
      <Stack spacing={2} style={{ padding: "50px" }}>
        <Typography>Your balance</Typography>
        <Typography
          style={{
            border: "2px solid black",
            borderRadius: "5px",
            padding: "5px",
          }}
        >
           {profile.balance}
        </Typography>
                <Button variant="contained" onClick={() => dispatch(increaseBalanceBy(1)) }>Add money</Button>
      </Stack>
      <Stack spacing={2} style={{ padding: "50px" }}>
        <Typography>Your tickets</Typography>
        <Ticket onTheMarket={true} />
        <Ticket onTheMarket={true} />
        <Ticket onTheMarket={false} />
        <Ticket onTheMarket={false} />
      </Stack>
    </div>
  );
}

export default ProfilePage;
