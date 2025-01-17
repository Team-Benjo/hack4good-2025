// import React from "react";
import { useNavigate } from "react-router-dom";
import { signOut } from "firebase/auth";
import { getAuth } from "firebase/auth";
import { Button } from "./components/ui/button";

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
        <Button _hover={{bg: "gray.200"}} size={'md'} color={'black'} onClick={() => navigate("/admin/user/")}>
          View Residents
        </Button>
      </div>
      <Button _hover={{bg: "gray.200"}} color={'black'} onClick={handleLogout}>
        Logout
      </Button>
    </div>
  )
}