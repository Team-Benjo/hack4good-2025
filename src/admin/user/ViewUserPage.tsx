import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { getDocs, query, where, updateDoc, doc } from "firebase/firestore";
import { db, usersCollection } from "../../firebase";
import { User } from "../../utils/types";
import { useNavigate } from "react-router-dom";

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
    const newDob = prompt("Enter new Date:");
    if (newDob === null) return;
    const userRef = doc(db, "users", id);
    const updatedDob = { dob: newDob };
    await updateDoc(userRef, updatedDob);
    if (currUser) {
      navigate(`/admin/user/${currUser.name}`);
    }
  };

  const handleEditImage = async (id: string) => {
    const newImage = prompt("Upload new image:");
    if (newImage === null) return;
    const userRef = doc(db, "users", id);
    console.log(userRef);
    const updatedImage = { image: newImage };
    await updateDoc(userRef, updatedImage);
    if (currUser) {
      navigate(`/admin/user/${currUser.name}`);
    }
  };
  
  const deleteUser = () => {
  
  };

  return (
    <div>
      <h1>Viewing {id} Page</h1>
      <div>
        <h2>User Info</h2>
        {currUser ? (
          <div>
            <h3>{currUser.name}</h3>
            <button onClick={() => handleEditName(currUser.id)}>Edit Name</button>
            <p>{currUser.dob}</p>
            <button onClick={() => handleEditDob}>Edit DOB</button>
            <img src={currUser.image} alt={currUser.name} />
            <button onClick={() => handleEditImage}>Edit Image</button>
            <br />
            <button onClick={() => deleteUser}>Delete User</button>
          </div>
        ) : (
          <p>Loading...</p>
        )}
      </div>
      <button onClick={() => navigate("/admin/user")}>Back to User Page</button>
    </div>
  );
}