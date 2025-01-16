// import React from "react";
import { useNavigate } from "react-router-dom";

export default function AdminHomePage() {
  const navigate = useNavigate();
  return (
    <div>
      <h1>MWH Admin Page</h1>
      <div>
        <button onClick={() => navigate("/admin/user/")}>
          View Residents
        </button>
      </div>
      <button onClick={() => navigate("/")}>
        Logout
      </button>
    </div>
  )
}