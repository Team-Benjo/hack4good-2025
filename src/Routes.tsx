// src/App.tsx
import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import LandingLoginPage from "./LandingLogin"
import StaffLoginForm from './admin/auth/StaffLoginForm'
import ResidentLoginForm from './resident/auth/ResidentLoginForm'
import AdminHomePage from "./AdminHomePage";
import AdminUserPage from "./admin/user/AdminUserPage";
import RegisterUserPage from "./admin/user/RegisterUserPage";
import ResidentForgetPassword from "./resident/auth/ResidentForgetPassword";
import StaffForgetPassword from "./admin/auth/StaffForgetPassword";
import AdminViewProduct from "./admin/products/AdminViewProduct";
import { ResidentLanding } from "./resident/ResidentLanding";

export const LANDING_LOGIN = "/";
export const RESIDENT_LOGIN = "/user/login";
export const RESIDENT_RESET = "/user/login/reset";
export const RESIDENT_LANDING = "/user"
export const ADMIN_LOGIN = "/admin/login";
export const ADMIN_RESET = "/admin/login/reset"
export const ADMIN_LANDING = "/admin"
export const ADMIN_USER_MANAGEMENT = "/admin/user";
export const ADMIN_USER_REGISTRATION = "/admin/user/register";


const Routing: React.FC = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<LandingLoginPage />} />
        <Route path="/user/login" element={<ResidentLoginForm />} />
        <Route path={RESIDENT_RESET} element={<ResidentForgetPassword />} />
        <Route path={RESIDENT_LANDING} element={<ResidentLanding/>} />
        <Route path="/admin/login" element={<StaffLoginForm />} />
        <Route path={ADMIN_RESET} element={<StaffForgetPassword />} />
        <Route path="/admin/" element={<AdminHomePage />} />
        <Route path="/admin/user/" element={<AdminUserPage />} />
        <Route path="/admin/user/register" element={<RegisterUserPage />} />
        <Route path="/admin/product" element={<AdminViewProduct />} />
        <Route path="/admin/product/add" element={<RegisterUserPage />} />
        <Route path="/admin/product/:id" element={<RegisterUserPage />} />
      </Routes>
    </Router>
  );
};

export default Routing;
