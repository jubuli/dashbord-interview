import React, { useState } from 'react';
import './DynamicNav.css';

const Admin = () => {
  const [currentView, setCurrentView] = useState('login');
  const [userData, setUserData] = useState(null);
  const [selectedApp, setSelectedApp] = useState(null);

  const mockResponses = {
    "7806114864": {
      firstName: "Debjani",
      userName: "Debjani Das",
      userId: "DebjaniDas_413487dc",
      userCode: "7806114864",
      userImage: "https://example.com/images/deb.jpg",
      userEmail: "debjani@admin.com",
      userCategory: "admin",
      userType: "observer",
      userPermissions: [
        {
          app: "nipun_mis",
          navs: ["misCot", "misSopan", "misMcm"],
          _id: "68f9bd500e1d8f3cfc5a91ef"
        },
        {
          app: "nipun_report",
          navs: ["reportDashboard", "reportSopan", "reportSpot", "reportMcm"],
          _id: "68f9bd500e1d8f3cfc5a91f0"
        }
      ]
    },
    "0237201410": {
      firstName: "Govt",
      userName: "Admin",
      userId: "govt_admin_123",
      userCode: "0237201410",
      userImage: "https://example.com/images/deb.jpg",
      userEmail: "govt@admin.com",
      userCategory: "admin",
      userType: "govt admin",
      userPermissions: [
        {
          app: "nipun_mis",
          navs: ["misCot", "misSopan", "misMcm"],
          _id: "68f9bd500e1d8f3cfc5a91f1"
        },
        {
          app: "nipun_report",
          navs: ["reportDashboard", "reportSopan"],
          _id: "68f9bd500e1d8f3cfc5a91f2"
        }
      ]
    }
  };

  // ✅ Fetch and show data instantly on button click
  const simulateLogin = (authId) => {
    const data = mockResponses[authId];
    if (!data) {
      alert('No mock for that ID');
      return;
    }

    // Set data immediately (no localStorage delay)
    setUserData(data);
    setCurrentView('dashboard');

    // Auto-select nipun_mis
    const nipunMisApp = data.userPermissions.find(p => p.app === "nipun_mis");
    if (nipunMisApp) {
      setSelectedApp("nipun_mis");
    }
  };

  const logout = () => {
    setUserData(null);
    setSelectedApp(null);
    setCurrentView('login');
  };

  const showApp = (app) => {
    setSelectedApp(app);
  };

  const getAppTitle = (app) => {
    return app === 'nipun_mis' ? 'MIS Dashboard' : 'Report Dashboard';
  };

  const getSelectedAppData = () => {
    if (!userData || !selectedApp) return null;
    return userData.userPermissions.find(p => p.app === selectedApp);
  };

  const selectedAppData = getSelectedAppData();

  // LOGIN VIEW
  if (currentView === 'login') {
    return (
      <div className="container">
        <h2>Dynamic Nav UI Preview - Admin</h2>
        <div className="login-view">
          <p>Click to login as Admin:</p>
          <div className="row" style={{ marginBottom: '12px' }}>
            <button className="btn btn-primary" onClick={() => simulateLogin('7806114864')}>
              Login as Super Admin (Debjani)
            </button>
            {/* <button className="btn btn-ghost" onClick={() => simulateLogin('0237201410')}>
              Login as Govt Admin
            </button> */}
          </div>
          <p style={{ color: '#6b7280' }}>
            Admin access with MIS & Report Dashboard permissions.
          </p>
        </div>
      </div>
    );
  }

  // DASHBOARD VIEW
  return (
    <div className="container">
      <div className="dashboard-view">
        <div className="layout">
          {/* Sidebar */}
          <div className="sidebar">
            <div className="user-profile">
              <img className="avatar" src={userData.userImage} alt="avatar" />
              <div className="user-name">{userData.userName}</div>
              <div className="user-email">{userData.userEmail}</div>
              <div className="user-category">{userData.userCategory} • {userData.userType}</div>
              <div className="user-code">ID: {userData.userCode}</div>
            </div>

            <h4>Apps</h4>
            <ul className="apps-list">
              {userData.userPermissions.map((permission, index) => (
                <li key={permission._id || index}>
                  <button
                    className={`btn btn-ghost app-btn ${selectedApp === permission.app ? 'active' : ''}`}
                    onClick={() => showApp(permission.app)}
                  >
                    {getAppTitle(permission.app)}
                  </button>
                </li>
              ))}
            </ul>

            <hr />
            <button className="btn btn-ghost" onClick={logout}>
              Logout
            </button>
          </div>

          {/* Main */}
          <div className="main">
            <h3 className="app-title">
              {selectedApp ? getAppTitle(selectedApp) : 'Select an app'}
            </h3>

            {selectedApp && selectedAppData && (
              <div className="navs-area">
                <h4>Navigation - {getAppTitle(selectedApp)}</h4>
                <div className="app-info">
                  <p><strong>App:</strong> {selectedAppData.app}</p>
                  <p><strong>Total Nav Items:</strong> {selectedAppData.navs.length}</p>
                </div>
                <ul>
                  {selectedAppData.navs.map((nav, index) => (
                    <li key={index}>
                      <strong>{nav}</strong>
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Admin;
