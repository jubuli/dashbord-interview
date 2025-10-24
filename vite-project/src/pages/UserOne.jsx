import React, { useState, useEffect } from 'react';
import './DynamicNav.css';

const UserOne = () => {
  const [currentView, setCurrentView] = useState('login');
  const [userData, setUserData] = useState(null);
  const [selectedApp, setSelectedApp] = useState(null);
  const [appData, setAppData] = useState(null); // ✅ New state for fetched data

  const mockResponses = {
    "0237201410": {
      firstName: "Ramesh",
      userName: "rameshpatra",
      userId: "rameshpatra_ac0889ac",
      userCode: "0237201410",
      userEmail: "rameshpatra@gmail.com",
      userCategory: "user",
      userType: "observer",
      userPermissions: [
        {
          app: "nipun_report",
          navs: ["reportDashboard", "reportCot", "reportSopan", "reportSpot"],
          _id: "68f9bb360e1d8f3cfc5a91e2"
        }
      ]
    }
  };

  useEffect(() => {
    const savedUserData = localStorage.getItem('userData');
    if (savedUserData) {
      const user = JSON.parse(savedUserData);
      setUserData(user);
      setCurrentView('dashboard');
    }
  }, []);

  const simulateLogin = (authId) => {
    const data = mockResponses[authId];
    if (!data) {
      alert('No mock for that id');
      return;
    }
    localStorage.setItem('userData', JSON.stringify(data));
    setUserData(data);
    setCurrentView('dashboard');
  };

  const logout = () => {
    localStorage.removeItem('userData');
    setUserData(null);
    setSelectedApp(null);
    setAppData(null);
    setCurrentView('login');
  };

  // ✅ Simulate "fetching" data when app button is clicked
  const showApp = (app) => {
    setSelectedApp(app);
    setAppData(null); // clear old data first

    // Simulated loading delay
    setTimeout(() => {
      const permission = userData.userPermissions.find(p => p.app === app);
      if (permission) {
        setAppData({
          app: permission.app,
          navs: permission.navs,
          fetchedAt: new Date().toLocaleTimeString(),
        });
      }
    }, 800); // simulate fetch delay
  };

  const getAppTitle = (app) => {
    return app === 'nipun_mis' ? 'MIS Dashboard' : 'Report Dashboard';
  };

  if (currentView === 'login') {
    return (
      <div className="container">
        <h2>Dynamic Nav UI Preview</h2>
        <div className="login-view">
          <p>Click to login as User:</p>
          <button className="btn btn-primary" onClick={() => simulateLogin('0237201410')}>
            Login as User (Ramesh)
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="container">
      <div className="layout">
        <div className="sidebar">
          <div className="user-profile">
            <div className="user-name">{userData.userName}</div>
            <div className="user-email">{userData.userEmail}</div>
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

          {/* ✅ Show "loading" or fetched data */}
          {selectedApp && !appData && <p>⏳ Fetching app data...</p>}

          {appData && (
            <div className="navs-area">
              <h4>{getAppTitle(appData.app)}</h4>
              <p><strong>Fetched at:</strong> {appData.fetchedAt}</p>
              <ul>
                {appData.navs.map((nav, index) => (
                  <li key={index}>{nav}</li>
                ))}
              </ul>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default UserOne;
