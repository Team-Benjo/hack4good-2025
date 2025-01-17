import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { User } from "../../utils/types";
import { usersCollection } from "../../firebase";
import { getDocs } from "firebase/firestore";
import { Avatar } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";

export default function AdminUserPage() {
  const [users, setUsers] = useState<User[]>([]);

  useEffect(() => {
    const getUsers = async () => {
      // Fetch users from the database
      const data = await getDocs(usersCollection);
      setUsers(data.docs.map((doc) => doc.data() as User));
    }

    getUsers();
  }, []);
  const navigate = useNavigate();
  
  return (
    <div style={{ padding: "20px", maxWidth: "800px", margin: "0 auto" }}>
      <h1 style={{ textAlign: "center", marginBottom: "20px" }}>MWH Residents</h1>
      <div>
        <p style={{ fontSize: "1.5rem", marginBottom: "10px" }}>Residents</p>
        <div style={{ display: "flex", flexDirection: "column", gap: "20px" }}>
          {users.map((user) => (
            <div key={user.id} style={{ display: "flex", alignItems: "center", padding: "10px", border: "1px solid #ccc", borderRadius: "8px", backgroundColor: "#f9f9f9" }}>
              <Avatar name={user.name} src={user.image} style={{ borderRadius: "50%", marginRight: "20px" }} />
              <div style={{ flexGrow: 1 }}>
                <h3 style={{ margin: 0, fontSize: "1.5rem" }}>{user.name}</h3>
                <p style={{ margin: "5px 0", fontSize: "1rem" }}>{user.dob}</p>
              </div>
              <Button 
                className="button-style"
                  onClick={() => navigate(`/admin/user/${user.name}`)}>
                View Resident
              </Button>
            </div>
          ))}
        </div>
        <div style={{ display: "flex", justifyContent: "space-between", marginTop: "20px" }}>
          <Button className="button-style" onClick={() => navigate("/admin/user/register")}>
            Register a new resident
          </Button>
          <Button className="button-style" onClick={() => navigate("/admin")}>
            Back to Admin Page
          </Button>
        </div>
      </div>
    </div>
  );
}
