import React from "react";
import ProfilePage from "./pages/profilePage/ProfilePage";
import RegisterPage from "./pages/registerPage/RegisterPage";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import LoginPage from './pages/loginPage/LoginPage';
import MarketPage from './pages/marketPage/MarketPage';

function App() {
  return (
    <BrowserRouter>
          <Routes>
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/" element={<ProfilePage />} />
        <Route path="/market" element={<MarketPage />} />
        <Route path="/login/ReturnUrl=:returnUrl" element={<LoginPage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
