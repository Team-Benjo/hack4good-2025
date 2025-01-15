import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { User } from "../../types";

export default function RegisterUserPage() {
    const [name, setName] = useState("");
    const [age, setAge] = useState(0);
    const [image, setImage] = useState("");

    const navigate = useNavigate();
    
    const handleNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setName(e.target.value);
    };

    const handleAgeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setAge(parseInt(e.target.value));
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
            age: age,
            image: image
        };
        console.log(newUser.name);
        console.log(newUser.age);
    };
    return (
        <div>
            <h1>Register New Resident</h1>
            <form onSubmit={handleRegister}>
                <input placeholder="Full Name" value={name} onChange={handleNameChange} />
                <br />
                <input type="number" placeholder="Age" value={age} onChange={handleAgeChange}/>
                <br />
                <input type="file" name="image" value={image} onChange={handleImageChange}/>
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