import React from "react";
import ProfilePage from "./pages/profilePage/ProfilePage";
import { BrowserRouter, Route, Routes } from "react-router-dom";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<ProfilePage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
