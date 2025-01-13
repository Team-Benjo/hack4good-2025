// src/components/StaffLoginForm.tsx
import React, { useState } from "react";

import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
import { usernameToEmail } from "../../utils/UsernameToEmail";

// TODO: USE THE CHAKRA UI

const StaffLoginForm: React.FC = () => {
  const [username, setUsername] = useState<string>("");
  const [password, setPassword] = useState<string>("");

  const [err, seterr] = useState<string | undefined>(undefined)

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Login clicked with:", { username, password });
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
    console.log("Reset password clicked");
    // Add password reset logic here
  };

  return (
    <div >
      <form  onSubmit={handleLogin}>
        <h1>Staff Login</h1>
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

export default StaffLoginForm;
