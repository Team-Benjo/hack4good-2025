import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { User } from "../../utils/types";
import { usersCollection } from "../../firebase";
import { getDocs } from "firebase/firestore";
import { Avatar } from "@/components/ui/avatar";

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
    <div>
      <h1>MWH Residents</h1>
      <div>
        <h2>Residents</h2>
        <div>
          {users.map((user) => (
            <div key={user.id}>
              <h3>{user.name}</h3>
              <p>{user.dob}</p>
              <Avatar
                name = {user.name}
                src = {user.image}
              />
              <button onClick={() => navigate(`/admin/user/${user.name}`)} >
                View Resident
              </button>
            </div>
          ))}
        </div>
        <button onClick={() => navigate("/admin/user/register")}>
          Register a new resident
        </button>
      </div>
      <button onClick={() => navigate("/admin")}>Back to Admin Page</button>
    </div>
  );
}
