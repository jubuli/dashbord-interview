import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const DashboardAdmin = () => {
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const storedUser = localStorage.getItem("userData");
    if (storedUser) setUser(JSON.parse(storedUser));
    else navigate("/");
  }, [navigate]);

  if (!user) return <p>Loading...</p>;

  return (
    <div style={{ textAlign: "center", marginTop: "50px" }}>
      <h2>👑 Welcome {user.firstName} to Admin Dashboard</h2>
      <p>Auth ID: {user.userCode}</p>
      <button onClick={() => { localStorage.clear(); navigate("/"); }} style={{ padding: "10px", backgroundColor: "red", color: "white", border: "none", borderRadius: "5px" }}>Logout</button>
    </div>
  );
};

export default DashboardAdmin;
