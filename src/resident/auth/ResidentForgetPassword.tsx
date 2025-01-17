// src/components/ResidentLoginForm.tsx
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { LANDING_LOGIN } from "../../Routes";

import { getAuth, sendPasswordResetEmail } from "firebase/auth";


const ResidentForgetPassword: React.FC = () => {
  const [email, setEmail] = useState<string>("");
  const [sendSuccess, setSendSuccess] = useState<boolean>(false);
  const [err, setErr] = useState<string|undefined>(undefined)
  const auth = getAuth();

  const navigate = useNavigate();

  const handleResetPassword = (e: React.FormEvent) => {
    e.preventDefault()
    console.log("Reset password clicked for Resident");
    sendPasswordResetEmail(auth, email)
    .then(() => setSendSuccess(true))
    .catch(e => {
      setErr("There was an error sending the email.")
      console.log(e)
    })
    // Add password reset logic here
  };

  return (
    <div >
      <form onSubmit={handleResetPassword}>
        <h1>Reset Password (Resident)</h1>
        <div>
          <label htmlFor="email">
            email:
          </label>
          <input
            id="phone"
            type="text"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
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
      {
      sendSuccess ? <text>Email sent!</text>
      : err ? <text>{err}</text>
    : ""}
    </div>
  );
};


export default ResidentForgetPassword;
