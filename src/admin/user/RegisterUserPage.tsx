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
import { Input } from "@chakra-ui/react";
import { Field } from "@/components/ui/field";
import { Button } from "@/components/ui/button";

export default function RegisterUserPage() {
  const [name, setName] = useState("");
  const [dob, setDob] = useState("");
  const [image, _] = useState("");
  
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

  /* const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      console.log(e.target.files[0]);
    }
    const reader = new FileReader();
    reader.onload = (e) => {
      if (e.target) {
        setImage(e.target.result as string);
      }
    };
  };*/

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
        <div style={{ paddingBottom: "1rem" }}>
          <Field helperText="Enter the name of the resident" >
            <label style={{ fontSize: "1.1rem" }}>Name</label>
            <Input value={name} onChange={handleNameChange} />
          </Field>
        </div>
        <div style={{ paddingBottom: "1rem" }}>
          <Field helperText="Enter the date of birth of the resident" style={{ fontSize: "1.5rem" }}>
            <label style={{ fontSize: "1.1rem" }}>Date of Birth</label>
            <input type="date" value={dob} onChange={handleDobChange} style={{fontSize: "1rem"}}/>
          </Field>
        </div>
        {/* <div style={{ paddingBottom: "1rem" }}>
          <Field helperText="Upload an image of the resident">
            <div style={{ display: "flex", justifyContent: "left", width: "100%" }}>
              <input type="file" accept="image/*" onChange={handleImageChange} />
            </div>
            <img src={image} alt="Resident" style={{ alignContent: "center" }} />
          </Field>
        </div> */}
        <div style={{ paddingBottom: "1rem" }}>
          <Button className="button-style" type="submit">Register</Button>
        </div>
      </form>
      <div style={{ paddingBottom: "1rem" }}>
        <Button className="button-style" onClick={() => navigate("/admin/user/")}>
          Back to User Page
        </Button>
      </div>
    </div>
  )
}
