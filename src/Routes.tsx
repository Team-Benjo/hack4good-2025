// src/App.tsx
import React from "react";
import { BrowserRouter as Router, Routes, Route, useNavigate } from "react-router-dom";
import LandingLoginPage from "./LandingLogin"
import StaffLoginForm from './admin/auth/StaffLoginForm'
import ResidentLoginForm from './resident/auth/ResidentLoginForm'

const Routing: React.FC = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<LandingLoginPage />} />
        <Route path="/user/login" element={<ResidentLoginForm />} />
        <Route path="/admin/login" element={<StaffLoginForm />} />
      </Routes>
    </Router>
  );
};

export default Routing;
