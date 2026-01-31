import React,{useState} from 'react'
import {useNavigate, Link} from "react-router-dom"
import "./assets/styles.css"

function Register() {
     const [username,setUsername] = useState("");
     const [email,setEmail] = useState("");
     const [password,setPassword] = useState("");
     const [age,setAge] = useState("");
     const [marks,setMarks] = useState("");
     const [role,setRole] = useState("USER");
     const [error,setError] = useState("");
     const [success,setSuccess] = useState("");

    const navigate = useNavigate();
    
    const handleRegister = async (e) => {
        e.preventDefault();
        setError("");
        setSuccess("");

        if (!username || !email || !password || !age || !marks || !role) {
            setError("Please fill all fields");
            return;
        }

        try {
            const response = await fetch("/api/register",{
                method:"POST",
                credentials: "include",
                headers:{
                    "Content-Type":"application/json",
                },
                body:JSON.stringify({
                    username,
                    email,
                    password,
                    age: parseInt(age),
                    marks: parseInt(marks),
                    role
                }),
            });
            const data = await response.json();
            if(response.ok || response.status === 201) {
                setSuccess(data.message || "Registration successful!");
                setTimeout(() => navigate("/"), 1500);
            } else {
                setError(data.message || "Registration failed");
            }
        }
        catch(error) {
            setError("Something went wrong. Please try again");
        }

    };


  return (
  <div className="register-container">
        <h2 className="heading"> Register </h2>
        <form onSubmit={handleRegister} className="register-form">
            <label htmlFor="username" className="register-label">Username:</label>
            <input type="text" placeholder="Enter a username" value={username} onChange={(e)=> setUsername(e.target.value)} className="register-input" required />

            <label htmlFor="email" className="register-label">Email:</label>
            <input type="email" placeholder="Enter your email" value={email} onChange={(e)=> setEmail(e.target.value)} className="register-input" required />
            
            <label htmlFor="password" className="register-label">Password:</label>
            <input type="password" placeholder="Enter a Password" value={password} onChange={(e)=> setPassword(e.target.value)} className="register-input" required />
            
            <label htmlFor="age" className="register-label">Age:</label>
            <input type="number" placeholder="Enter your age" value={age} onChange={(e)=> setAge(e.target.value)} className="register-input" min="1" required />
            
            <label htmlFor="marks" className="register-label">Marks:</label>
            <input type="number" placeholder="Enter your marks" value={marks} onChange={(e)=> setMarks(e.target.value)} className="register-input" min="0" max="100" required />
            
            <label htmlFor="role" className="register-label">Role:</label>
            <select value={role} onChange={(e)=> setRole(e.target.value)} className="register-input" required>
                <option value="USER">USER</option>
                <option value="ADMIN">ADMIN</option>
            </select>
            
            <button type="submit" className="register-button">Register</button>
            <p>
                Already have an account?{" "}
                <Link to="/">Login</Link>
            </p>
        </form>
        {success && <p className="register-success">{success}</p>}
        {error && <p className="register-error">{error}</p>}
    </div>
  )
}

export default Register
