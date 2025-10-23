import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const DashboardUser2 = () => {
  const [user, setUser] = useState(null);
  const [selectedApp, setSelectedApp] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const storedUser = localStorage.getItem("userData");
    if (storedUser) {
      const parsedUser = JSON.parse(storedUser);
      setUser(parsedUser);
      if (parsedUser.userPermissions && parsedUser.userPermissions.length > 0) {
        setSelectedApp(parsedUser.userPermissions[0].app);
      }
    } else {
      navigate("/"); // redirect to login if not logged in
    }
  }, [navigate]);

  if (!user) return <p>Loading...</p>;

  return (
    <div style={{ textAlign: "center", marginTop: "50px" }}>
      <h2>👤 Welcome {user.firstName} to User2 Dashboard</h2>
      <p>Auth ID: {user.userCode}</p>

      {/* Dynamic app buttons */}
      <div style={{ margin: "20px 0" }}>
        {user.userPermissions.map((perm) => (
          <button
            key={perm.app}
            onClick={() => setSelectedApp(perm.app)}
            style={{
              padding: "10px 15px",
              margin: "0 5px",
              borderRadius: "5px",
              border: selectedApp === perm.app ? "2px solid #0b84ff" : "1px solid #ccc",
              background: selectedApp === perm.app ? "#e7f0ff" : "#fff",
              cursor: "pointer",
            }}
          >
            {perm.app}
          </button>
        ))}
      </div>

      {/* App content */}
      <div style={{ border: "1px solid #eee", padding: 20, borderRadius: 8 }}>
        {selectedApp === "nipun_mis" && (
          <div>
            <h3>📊 Nipun MIS Dashboard</h3>
            <p>Yaha app ka content dikhega.</p>
          </div>
        )}
        {/* future apps ke liye conditions yaha add kar sakti ho */}
      </div>

      <button
        onClick={() => {
          localStorage.clear();
          navigate("/");
        }}
        style={{
          padding: "10px",
          backgroundColor: "red",
          color: "white",
          border: "none",
          borderRadius: "5px",
          marginTop: "20px",
        }}
      >
        Logout
      </button>
    </div>
  );
};

export default DashboardUser2;
