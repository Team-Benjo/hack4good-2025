// src/components/ResidentLoginForm.tsx
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { LANDING_LOGIN } from "../../Routes";

const StaffForgetPassword: React.FC = () => {
  const [phone, setPhone] = useState<string>("");

  const navigate = useNavigate();

  const handleResetPassword = () => {
    console.log("Reset password clicked for Resident");
    // Add password reset logic here
  };

  return (
    <div >
      <form onSubmit={handleResetPassword}>
        <h1>Reset Password (Staff)</h1>
        <div>
          <label htmlFor="phone">
            Phone number:
          </label>
          <input
            id="phone"
            type="text"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            required
          />
        </div>
        <div>
          <button type="submit">
            Reset Password
          </button>
          <button type="button" onClick={() => navigate(LANDING_LOGIN)}>
            Back to Login
          </button>
        </div>
      </form>
    </div>
  );
};


export default StaffForgetPassword;
