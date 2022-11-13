import React from "react";
import ProfilePage from "./pages/profilePage/ProfilePage";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import LoginPage from "./pages/loginPage/LoginPage";
import RegisterPage from "./pages/registerPage/RegisterPage";
import MarketPage from "./pages/marketPage/MarketPage";
import TicketPage from "./pages/ticketPage/TicketPage";
import { LOGIN_URL, MARKET_URL, PROFILE_URL, REGISTER_URL, TICKET_URL } from "./constants";



function App() {
return (
    <BrowserRouter>
      <Routes>
        <Route path={PROFILE_URL} element={<ProfilePage />} />
        <Route path={MARKET_URL} element={<MarketPage />} />
        <Route path={LOGIN_URL} element={<LoginPage />} />
        <Route path={REGISTER_URL} element={<RegisterPage />} />
        <Route path={TICKET_URL} element={<TicketPage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
