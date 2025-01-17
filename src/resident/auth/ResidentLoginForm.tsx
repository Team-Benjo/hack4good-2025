// src/components/ResidentLoginForm.tsx
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
import React, { useState } from "react";
import { usernameToEmail } from "../../utils/UsernameToEmail";
import { useNavigate } from "react-router-dom";
import { RESIDENT_LANDING, RESIDENT_RESET } from "../../Routes";

const ResidentLoginForm: React.FC = () => {

  const navigate = useNavigate();

  const [username, setUsername] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [err, seterr] = useState<string | undefined>(undefined)
  
  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    // Add authentication logic here
    const auth = getAuth();
        signInWithEmailAndPassword(auth, usernameToEmail(username, true), password)
          .then((userCredential) => {
        // Signed in 
            const user = userCredential.user;
            navigate(RESIDENT_LANDING)
        // ...
          })
          .catch((error) => {
            const errorCode = error.code;
            const errorMessage = error.message;
            seterr(errorMessage)
          });
      };
  

  const handleResetPassword = () => {
    // Add password reset logic here
    navigate(RESIDENT_RESET)
  };

  return (
    <div style={{ padding: "20px", maxWidth: "400px", margin: "0 auto", textAlign: "center", border: "1px solid #ccc", borderRadius: "8px", backgroundColor: "#f9f9f9" }}>
      <form onSubmit={handleLogin}>
        <h1 style={{ marginBottom: "20px" }}>Resident Login</h1>
        <div style={{ marginBottom: "15px" }}>
          <label htmlFor="username" style={{ display: "block", marginBottom: "5px", fontWeight: "bold" }}>
            Username:
          </label>
          <input
            id="username"
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
            style={{ width: "100%", padding: "10px", borderRadius: "4px", border: "1px solid #ccc" }}
          />
        </div>
        <div style={{ marginBottom: "15px" }}>
          <label htmlFor="password" style={{ display: "block", marginBottom: "5px", fontWeight: "bold" }}>
            Password:
          </label>
          <input
            id="password"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            style={{ width: "100%", padding: "10px", borderRadius: "4px", border: "1px solid #ccc" }}
          />
        </div>
        <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "20px" }}>
          <button type="submit" className="button-style">
            Login
          </button>
          <button type="button" className="button-style" onClick={handleResetPassword}>
            Reset Password
          </button>
        </div>
      </form>
      {err ? <h2 style={{ color: "red" }}>{err}</h2> : null}
    </div>
  );
};


export default ResidentLoginForm;
