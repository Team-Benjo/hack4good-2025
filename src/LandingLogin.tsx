// src/components/LoginPage.tsx
import React from "react";
import { useNavigate } from "react-router-dom";


// TODO: USE THE CHAKRA UI
const LandingLoginPage: React.FC = () => {

  const navigate = useNavigate();

  const handleResidentLogin = () => {
    console.log("Resident login clicked");
    navigate("/user/login");
  };

  const handleStaffLogin = () => {
    console.log("Staff login clicked");
    // Add logic to navigate or authenticate as a staff member
    navigate("/admin/login");
  };

  return (
    <div style={{ padding: "20px", maxWidth: "600px", margin: "0 auto", textAlign: "center" }}>
      <h1 style={{ marginBottom: "20px" }}>Welcome to Muhammadiyah Welfare Home Minimart</h1>
      <div style={{ marginBottom: "20px" }}>
        <button 
          className="button-style"
          style={{ 
            margin: "10px"
          }} 
          onClick={handleResidentLogin}
        >
          Login as Resident
        </button>
        <button 
          className="button-style"
          style={{ 
            margin: "10px"
          }} 
          onClick={handleStaffLogin}
        >
          Login as Staff
        </button>
      </div>
      <button 
        className="button-style" 
        onClick={() => navigate("/admin/")}
      >
        Admin Page
      </button>
    </div>
  );
};

export default LandingLoginPage;
