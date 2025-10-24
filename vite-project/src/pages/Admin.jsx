



import React, { useState, useEffect } from 'react';
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
      userName: "Govt Admin",
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

  useEffect(() => {
    const savedUserData = localStorage.getItem('adminData');
    if (savedUserData) {
      const user = JSON.parse(savedUserData);
      setUserData(user);
      setCurrentView('dashboard');
      
      // Automatically select first app (nipun_mis) when dashboard loads
      if (user.userPermissions.length > 0) {
        setSelectedApp(user.userPermissions[0].app);
      }
    }
  }, []);

  const simulateLogin = (authId) => {
    const data = mockResponses[authId];
    if (!data) {
      alert('No mock for that id');
      return;
    }
    localStorage.setItem('adminData', JSON.stringify(data));
    setUserData(data);
    setCurrentView('dashboard');
    
    // Automatically select first app (nipun_mis) after login
    if (data.userPermissions.length > 0) {
      setSelectedApp(data.userPermissions[0].app);
    }
  };

  const logout = () => {
    localStorage.removeItem('adminData');
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

  // Get selected app data
  const getSelectedAppData = () => {
    if (!userData || !selectedApp) return null;
    return userData.userPermissions.find(permission => permission.app === selectedApp);
  };

  const selectedAppData = getSelectedAppData();

  if (currentView === 'login') {
    return (
      <div className="container">
        <h2>Dynamic Nav UI Preview - Admin Panel</h2>
        <div className="login-view">
          <p>Click to login as Admin:</p>
          <div className="row" style={{ marginBottom: '12px' }}>
            <button className="btn btn-primary" onClick={() => simulateLogin('7806114864')}>
              Login as Super Admin (Debjani)
            </button>
            <button className="btn btn-ghost" onClick={() => simulateLogin('0237201410')}>
              Login as Govt Admin
            </button>
          </div>
          <p style={{ color: '#6b7280' }}>
            Admin access with full system permissions.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="container">
      <div className="dashboard-view">
        <div className="layout">
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

          <div className="main">
            <h3 className="app-title">
              {selectedApp ? getAppTitle(selectedApp) : 'Select an app'}
            </h3>

            {selectedApp && selectedAppData && (
              <div className="navs-area">
                <h4>Navigation - {getAppTitle(selectedApp)}</h4>
                <div className="app-info">
                  <p><strong>App ID:</strong> {selectedAppData._id}</p>
                  <p><strong>App:</strong> {selectedAppData.app}</p>
                  <p><strong>Total Navigation Items:</strong> {selectedAppData.navs.length}</p>
                </div>
                <ul>
                  {selectedAppData.navs.map((nav, index) => (
                    <li key={index} className={selectedApp === 'nipun_mis' ? 'mis-nav' : 'report-nav'}>
                      <strong>{nav}</strong>
                      {selectedApp === 'nipun_mis' ? ' ' : ' '}
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