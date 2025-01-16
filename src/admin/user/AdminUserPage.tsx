import { useNavigate } from "react-router-dom";
import { getAuth, signOut } from "firebase/auth";

export default function AdminUserPage() {
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
      <h1>MWH Residents</h1>
      <div>
        <h2>Residents</h2>
        <button onClick={() => navigate("/admin/user/register")}>
          Register a new resident
        </button>
      </div>
      <button onClick={handleLogout}>Back to Admin Page</button>
    </div>
  );
}
