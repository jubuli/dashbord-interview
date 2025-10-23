import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import LoginPage from './FormTable'
import { BrowserRouter, Routes, Route } from "react-router-dom";
 import Login from './componet/Login'
import UserDashboard1 from "./pages/UserDashboard1";
import UserDashboard2 from "./pages/UserDashboard2";
import AdminDashboard from "./pages/AdminDashboard";
function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/dashboard/user1" element={<UserDashboard1 />} />
          <Route path="/dashboard/user2" element={<UserDashboard2 />} />
          <Route path="/dashboard/admin" element={<AdminDashboard />} />
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App
