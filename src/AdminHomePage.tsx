// import React from "react";
import { useNavigate } from "react-router-dom";
import { signOut } from "firebase/auth";
import { getAuth } from "firebase/auth";
import { Button } from "./components/ui/button";
import { ADMIN_LOGS } from "./Routes";

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
    <div
      style={{
        padding: "20px",
        maxWidth: "600px",
        margin: "0 auto",
        textAlign: "center",
      }}
    >
      <h1 style={{ marginBottom: "20px" }}>MWH Admin Page</h1>
      <div style={{ marginBottom: "20px" }}>
        <Button
          className="button-style"
          onClick={() => navigate("/admin/user/")}
        >
          View Residents
        </Button>
      </div>
      <div style={{ marginBottom: "20px" }}>
        <Button
          className="button-style"
          onClick={() => navigate("/admin/product/")}
        >
          View Products
        </Button>
      </div>
      <div style={{ marginBottom: "20px" }}>
        <Button
          className="button-style"
          onClick={() => navigate("/admin/order/")}
        >
          View Orders
        </Button>
      </div>
      <div style={{ marginBottom: "20px" }}>
        <Button
          className="button-style"
          onClick={() => navigate(ADMIN_LOGS)}
        >
          View Logs
        </Button>
      </div>
      <Button className="button-style" onClick={handleLogout}>
        Logout
      </Button>
    </div>
  );
}
