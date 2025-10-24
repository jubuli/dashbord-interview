import React from "react";
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from "./componet/Navbar";
import UserOne from "./pages/UserOne";
import UserTwo from "./pages/UserTwo";
import Admin from "./pages/Admin";
import './App.css';

const App = () => {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<UserOne />} />
        <Route path="/admin" element={<Admin />} />
        <Route path="/user" element={<UserOne />} />
        <Route path="/usertwo" element={<UserTwo />} />
      </Routes>
    </Router>
  );
};

export default App;