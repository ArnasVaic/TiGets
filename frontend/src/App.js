import React from "react";
import ProfilePage from "./pages/profilePage/ProfilePage";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import LoginPage from './pages/loginPage/LoginPage';
import RegisterPage from './pages/registerPage/RegisterPage';
import MarketPage from './pages/marketPage/MarketPage';
import { LOGIN_URL } from './constants';
import { REGISTER_URL } from './constants';

function App() {
  return (
    <BrowserRouter>
      <Routes>       
        <Route path="/profile" element={<ProfilePage />} />
        <Route path="/market" element={<MarketPage />} />
        <Route path={LOGIN_URL} element={<LoginPage />} />
        <Route path={REGISTER_URL} element={<RegisterPage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
