// src/App.tsx
import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import LandingLoginPage from "./LandingLogin"
import StaffLoginForm from './admin/auth/StaffLoginForm'
import ResidentLoginForm from './resident/auth/ResidentLoginForm'
import AdminHomePage from "./AdminHomePage";
import AdminUserPage from "./admin/user/AdminUserPage";
import RegisterUserPage from "./admin/user/RegisterUserPage";
import AdminViewProduct from "./admin/products/AdminViewProduct";
import AdminEditProduct from "./admin/products/AdminEditProduct";

const Routing: React.FC = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<LandingLoginPage />} />
        <Route path="/user/login" element={<ResidentLoginForm />} />
        <Route path="/admin/login" element={<StaffLoginForm />} />
        <Route path="/admin/" element={<AdminHomePage />} />
        <Route path="/admin/user/" element={<AdminUserPage />} />
        <Route path="/admin/user/register" element={<RegisterUserPage />} />
        <Route path="/admin/product" element={<AdminViewProduct />} />
        <Route path="/admin/product/add" element={<RegisterUserPage />} />
        <Route path="/admin/product/:id" element={<AdminEditProduct />} />
      </Routes>
    </Router>
  );
};

export default Routing;
