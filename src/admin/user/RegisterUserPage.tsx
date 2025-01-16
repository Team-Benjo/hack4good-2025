import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { User } from "../../utils/types";
import { createUserWithEmailAndPassword, signOut } from "firebase/auth";
import { firebaseConfig } from "../../firebase";
import { usernameToEmail } from "../../utils/UsernameToEmail";
import { doc, setDoc } from "firebase/firestore";
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { db } from "../../firebase";
import { v4 as uuidv4 } from "uuid";

export default function RegisterUserPage() {
  const [name, setName] = useState("");
  const [dob, setDob] = useState("");
  const [image, setImage] = useState("");
  
  const navigate = useNavigate();

  const getDate = (date: Date) => {
    return date.toISOString().split("T")[0];
  };

  const handleNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setName(e.target.value);
  };

  const handleDobChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    console.log(e.target.value);
    const newDob = new Date(e.target.value);
    setDob(getDate(newDob));
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      console.log(e.target.files[0]);
    }
    const reader = new FileReader();
    reader.onload = (e) => {
      if (e.target) {
        setImage(e.target.result as string);
      }
    };
  };

  const handleRegister = (e: React.FormEvent) => {
    e.preventDefault();
    const newUser: User = {
      id: uuidv4(),
      name: name,
      email: usernameToEmail(name, true),
      dob: dob,
      image: image
    };
    
    const tempApp = initializeApp(firebaseConfig, "temp");
    const tempAuth = getAuth(tempApp);

    createUserWithEmailAndPassword(tempAuth, newUser.email, "password")
      .then(() => {
        alert("Resident added successfully");
        signOut(tempAuth);
        addUsertoDB(newUser);
      }).then(() => {
        navigate("/admin/user/");
      }).catch((error) => {
        alert(error.message);
        console.log(error.code);
      });
  };

  const addUsertoDB = (newUser: User) => {
    // Add user to database
    console.log("Adding user to database");
    setDoc(doc(db, "users", newUser.id), newUser)
      .then((docRef) => {
        console.log("Document written with ID: ", docRef);
      }).catch((error) => {
        console.error("Error adding document: ", error);
      });
  }

  return (
    <div>
      <h1>Register New Resident</h1>
      <form onSubmit={handleRegister}>
        <label>Name</label>
        <input value={name} onChange={handleNameChange} />
        <br />
        <label>Date of Birth</label>
        <input type="date" value={dob} onChange={handleDobChange} />
        <br />
        <label>Image of Resident</label>
        <img src={image} />
        <input type="file" accept="image/*" onChange={handleImageChange} />
        <br />
        <button type="submit">Register</button>
      </form>
      <div>
        <button onClick={() => navigate("/admin/user/")}>
          Back to User Page
        </button>
      </div>
    </div>
  )
}
