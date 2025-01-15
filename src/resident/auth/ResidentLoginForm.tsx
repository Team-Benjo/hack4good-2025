// src/components/ResidentLoginForm.tsx
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
import React, { useState } from "react";
import { usernameToEmail } from "../../utils/UsernameToEmail";
import { useNavigate } from "react-router-dom";
import { RESIDENT_RESET } from "../../Routes";

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
    <div >
      <form onSubmit={handleLogin}>
        <h1>Resident Login</h1>
        <div>
          <label htmlFor="username">
            Username:
          </label>
          <input
            id="username"
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
          />
        </div>
        <div>
          <label htmlFor="password">
            Password:
          </label>
          <input
            id="password"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        <div>
          <button type="submit">
            Login
          </button>
          <button type="button" onClick={handleResetPassword}>
            Reset Password
          </button>
        </div>
      </form>
      {err ? <h2>{err}</h2>: <></>} 
    </div>
  );
};


export default ResidentLoginForm;
