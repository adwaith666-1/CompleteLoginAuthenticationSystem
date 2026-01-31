import { useState } from 'react'
import Login from './Login'
import DashBoard from './DashBoard'
import Register from './Register';
import OtpVerification from './OtpVerification';
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";


function App() {
  const [user, setUser] = useState(null);

  return (
  <BrowserRouter>
    <Routes>
       <Route
          path="/"
          element={<Login setUser={setUser} />}
        />
         <Route
          path="/register"
          element={<Register />}
        />
        <Route
          path="/otp-verify"
          element={<OtpVerification setUser={setUser} />}
        />
        <Route
          path="/dashboard"
          element={
            user ? <DashBoard username={user} /> : <Navigate to="/" />
          }
        />
    
    </Routes>
  </BrowserRouter>
  );
}

export default App
