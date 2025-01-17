import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { getDocs, query, where, updateDoc, doc } from "firebase/firestore";
import { db, usersCollection } from "../../firebase";
import { User } from "../../utils/types";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";

export default function ViewUserPage() {
  const navigate = useNavigate();
  const { id } = useParams();
  
  const [currUser, setCurrUser] = useState<User | null>(null);

  useEffect(() => {
    async function getUser() {
      const q = query(usersCollection, where("name", "==", id));
      const userDocs = await getDocs(q);
      const userData = userDocs.docs[0]?.data();
      setCurrUser(userData as User);
    }
    getUser();
  }, [id]);

  const handleEditName = async (id: string) => {
    const newName = prompt("Enter new name:");
    if (newName === null) return;
    const userRef = doc(db, "users", id);
    const updatedName = { name: newName };
    await updateDoc(userRef, updatedName);
    navigate(`/admin/user/${newName}`);
  };

  const handleEditDob = async (id: string) => {
    const newDob = prompt("Enter new Date: (YYYY-MM-DD)");
    if (newDob === null) return;
    const userRef = doc(db, "users", id);
    const updatedDob = { dob: newDob };
    await updateDoc(userRef, updatedDob);
    window.location.reload();
  };

  // const handleEditImage = async (id: string) => {
  //   const newImage = prompt("Upload new image:");
  //   if (newImage === null) return;
  //   const userRef = doc(db, "users", id);
  //   console.log(userRef);
  //   const updatedImage = { image: newImage };
  //   await updateDoc(userRef, updatedImage);
  //   if (currUser) {
  //     navigate(`/admin/user/${currUser.name}`);
  //   }
  // };
  
  const deleteUser = () => {
  
  };

  return (
    <div style={{ padding: "20px", maxWidth: "800px", margin: "0 auto", textAlign: "center" }}>
      <h1 style={{ marginBottom: "20px" }}>Viewing {id} Page</h1>
      <div>
        <p style={{ fontSize: "2rem", marginBottom: "20px" }}>User Info</p>
        {currUser ? (
          <div>
            <div style={{ display: "flex", justifyContent: "center", marginBottom: "20px" }}>
              <img 
                src={currUser.image || "https://cdn.iconscout.com/icon/free/png-256/free-anonymous-user-icon-download-in-svg-png-gif-file-formats--people-avatar-cryptocurrency-pack-business-icons-1133988.png"} 
                style={{ width: "150px", height: "150px", borderRadius: "50%" }} 
                alt="User Avatar"
              />
            </div>
            <p style={{ fontSize: "1.8rem", marginBottom: "10px" }}>{currUser.name}</p>
            <p style={{ fontSize: "1.8rem", marginBottom: "20px" }}>{currUser.dob}</p>
            <div style={{ display: "flex", justifyContent: "center", gap: "10px", marginBottom: "20px" }}>
              <Button className="button-style" onClick={() => handleEditName(currUser.id)}>
                Edit Name
              </Button>
              <Button className="button-style" onClick={() => handleEditDob(currUser.id)}>
                Edit DOB
              </Button>
              {/* <Button className="button-style" onClick={() => handleEditImage(currUser.id)}>
                Edit Image
              </Button> */}
            </div>
            {/* <Button className="button-style" style={{ backgroundColor: "#ff4122", color: "white", marginBottom: "20px" }} onClick={() => deleteUser()}>
              Delete User
            </Button> */}
          </div>
        ) : (
          <p>Loading...</p>
        )}
      </div>
      <Button className="button-style" onClick={() => navigate("/admin/user")}>
        Back to User Page
      </Button>
    </div>
  );
}