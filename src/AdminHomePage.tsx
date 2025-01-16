// import React from "react";
import { useNavigate } from "react-router-dom";
import { signOut } from "firebase/auth";
import { getAuth } from "firebase/auth";

export default function AdminHomePage() {
  const navigate = useNavigate();
  const handleLogout = () => {
    const auth = getAuth();
    signOut(auth)
      .then(() => {
        navigate("/");
      })
      .catch((error) => {
        console.error(error);
      });
  };
  return (
    <div>
      <h1>MWH Admin Page</h1>
      <div>
        <button onClick={() => navigate("/admin/user/")}>
          View Residents
        </button>
      </div>
      <button onClick={handleLogout}>
        Logout
      </button>
    </div>
  )
}