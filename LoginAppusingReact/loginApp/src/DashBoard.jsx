import React from "react"
import "./assets/styles.css"

const DashBoard = ({username}) => {
  return (
    <div className="dashboard-container">
      <h1>Hello {username}</h1>
      <h2>Welcome to Kodnest DashBoard</h2>
    </div>
  );
}

export default DashBoard
