import React, { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import "./assets/styles.css";

const OtpVerification = ({ setUser }) => {
  const [otp, setOtp] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();
  const location = useLocation();

  // username passed from Login via navigate state
  const username = location.state?.username;

  const handleVerify = async (e) => {
    e.preventDefault();
    setError("");

    if (!otp) {
      setError("Please enter OTP");
      return;
    }

    if (!username) {
      setError("Session expired. Please login again.");
      setTimeout(() => navigate("/"), 1500);
      return;
    }

    try {
      const response = await fetch("/api/verify-otp", {
        method: "POST",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ username, otp }),
      });

      const data = await response.json();

      if (response.ok) {
        setUser(username);
        navigate("/dashboard");
      } else {
        setError(data.message || "Invalid OTP. Please try again.");
      }
    } catch (err) {
      setError("Something went wrong. Please try again");
    }
  };

  return (
    <div className="login-container">
      <h2 className="heading">OTP Verification</h2>
      <p style={{ textAlign: "center", marginBottom: "16px", color: "#475569" }}>
        Enter the OTP sent to your registered email
      </p>
      <form onSubmit={handleVerify} className="login-form">
        <label htmlFor="otp" className="login-label">
          OTP:
        </label>
        <input
          type="text"
          placeholder="Enter 6-digit OTP"
          value={otp}
          onChange={(e) =>
            setOtp(e.target.value.replace(/\D/g, "").slice(0, 6))
          }
          className="login-input"
          maxLength={6}
          required
        />
        <button type="submit" className="login-button">
          Verify
        </button>
      </form>
      {error && <p className="login-error">{error}</p>}
    </div>
  );
};

export default OtpVerification;
