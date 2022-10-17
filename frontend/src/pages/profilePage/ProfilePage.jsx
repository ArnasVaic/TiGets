import React from "react";
import { getUserData, getUserTickets } from "../../services/profileService";
import { StyledProfilePage } from "./components/ProfilePage.styled.jsx";
import Header from "../../generalComponents/Header";
import UserTickets from "./components/UserTickets";
import { useEffect } from "react";
import UserData from "./components/UserData";
import { useDispatch } from "react-redux";
import { MARKET_URL } from "../../constants";

function ProfilePage() {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getUserData());
    dispatch(getUserTickets());
  }, [dispatch]);

  return (
    <>
      <Header navigateText="Market" url={MARKET_URL} />
      <StyledProfilePage>
        <UserData />
        <UserTickets />
      </StyledProfilePage>
    </>
  );
}

export default ProfilePage;
