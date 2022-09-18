import React from "react";
import ProfilePage from "./pages/profilePage/ProfilePage";
import RegisterPage from "./pages/registerPage/RegisterPage";
import { BrowserRouter, Route, Routes } from "react-router-dom";


function App() {
  return (
      <BrowserRouter>
          <Routes>
              <Route path="/register" element={<RegisterPage />} />
              <Route path="/profile" element={<ProfilePage />} />
          </Routes>
      </BrowserRouter>
  );
}

export default App;
