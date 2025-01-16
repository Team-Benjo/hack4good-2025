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
    <div >
      <h1 >Welcome to Muhammadiyah Welfare Home Minimart</h1>
      <div >
        <button onClick={handleResidentLogin}>
          Login as Resident
        </button>
        <button onClick={handleStaffLogin}>
          Login as Staff
        </button>
      </div>
      <button onClick={() => navigate("/admin/")}>
        Admin Page
      </button>
    </div>
  );
};

export default LandingLoginPage;
