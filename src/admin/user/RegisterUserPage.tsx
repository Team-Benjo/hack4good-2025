import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { User } from "../../utils/types";
import { createUserWithEmailAndPassword, getAuth } from "firebase/auth";
import { usernameToEmail } from "../../utils/UsernameToEmail";
import { db } from "../../firebase";
import { collection, addDoc } from "firebase/firestore";

export default function RegisterUserPage() {
  const [name, setName] = useState("");
  const [dob, setDob] = useState("");
  const [image, setImage] = useState("");

  const usersCollection = collection(db, "users");

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
    if (e.target.files) {
      const file = e.target.files[0];
      const reader = new FileReader();
      reader.onload = () => {
        if (reader.readyState === 2) {
          setImage(reader.result as string);
        }
      };
      reader.readAsDataURL(file);
    }
  };


  const handleRegister = (e: React.FormEvent) => {
    e.preventDefault();
    const newUser: User = {
      id: Math.random().toString(36),
      name: name,
      email: usernameToEmail(name, true),
      dob: dob,
      image: image
    };
    const auth = getAuth();
    createUserWithEmailAndPassword(auth, newUser.email, "password")
      .then(() => {
      // Signed up 
      alert("Resident added successfully");
      addUsertoDB(newUser);
      navigate("/admin/user/");
    })
      .catch((error) => {
        alert(error.message);
        console.log(error.code);
      });
  };

  const addUsertoDB = (newUser: User) => {
    // Add user to database
    console.log("Adding user to database");
    addDoc(usersCollection, newUser).then((docRef) => {
      console.log("Document written with ID: ", docRef.id);
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
        <input type="file" name="image" value={image} onChange={handleImageChange} />
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
