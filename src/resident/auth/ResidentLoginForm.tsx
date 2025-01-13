// src/components/ResidentLoginForm.tsx
import React, { useState } from "react";

const ResidentLoginForm: React.FC = () => {
  const [username, setUsername] = useState<string>("");
  const [password, setPassword] = useState<string>("");

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Resident Login clicked with:", { username, password });
    // Add authentication logic here
  };

  const handleResetPassword = () => {
    console.log("Reset password clicked for Resident");
    // Add password reset logic here
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
    </div>
  );
};


export default ResidentLoginForm;
