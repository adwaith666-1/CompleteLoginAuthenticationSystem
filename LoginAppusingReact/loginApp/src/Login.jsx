import React,{useState} from "react";
import "./assets/styles.css"
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";


const Login = ({setUser}) => {
    const [username,setUsername] = useState("");
    const [password,setPassword] = useState("");
    const [error,setError] = useState("");

const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError("");

        try {
            const response = await fetch("http://localhost:8080/api/login",{
                method:"POST",headers:{
                    "Content-Type":"application/json",
                },
                body:JSON.stringify({username,password}),
            });
            const data = await response.json();
            if(response.ok) {
                // Navigate to OTP page instead of dashboard
                navigate("/otp-verify", { state: { username: data.username } });
            } else {
                setError(data.message || data.Failed || "Login failed");
            }
        }
        catch(error) {
            setError("Something went wrong .Please try again");
        }

    };

  return (
    <div className="login-container">
        <h2 className="heading"> Login </h2>
        <form onSubmit={handleSubmit} className="login-form">
            <label htmlFor="username" className="login-label">Username:</label>
            <input type="text" placeholder="Enter your username" value={username} onChange={(e)=> setUsername(e.target.value)} className="login-input" />
            <label htmlFor="password" className="login-label">Password:</label>
            <input type="password" placeholder="Enter your Password" value={password} onChange={(e)=> setPassword(e.target.value)} className="login-input" />
            <button type="submit" className="login-button">Login</button>
            <p>
                Don’t have an account?{" "}
                <Link to="/register">Register</Link>
                </p>
        </form>
        {error && <p className="login-error">{error}</p>}
    </div>
  );
}

export default Login
