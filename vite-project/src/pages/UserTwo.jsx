import React, { useState, useEffect } from 'react';
// import './DynamicNav.css';

const UserTwo = () => {
  const [currentView, setCurrentView] = useState('login');
  const [userData, setUserData] = useState(null);
  const [selectedApp, setSelectedApp] = useState(null);
  const [appData, setAppData] = useState(null); // ✅ for fetched app data

  const mockResponses = {
    "3557630448": {
      firstName: "Arjun",
      userName: "Arjun Mishra",
      userId: "arjun_mishra_123",
      userCode: "3557630448",
      userImage: "https://example.com/images/arjun.jpg",
      userEmail: "arjun@example.com",
      userCategory: "user",
      userType: "basic",
      userPermissions: [
        { 
          app: "nipun_mis", 
          navs: ["misCot", "misSopan", "misMcm"],
          _id: "68f9bb360e1d8f3cfc5a91e3"
        }
      ]
    }
  };
    
  useEffect(() => {
    const savedUserData = localStorage.getItem('userTwoData');
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
    localStorage.setItem('userTwoData', JSON.stringify(data));
    setUserData(data);
    setCurrentView('dashboard');
  };

  const logout = () => {
    localStorage.removeItem('userTwoData');
    setUserData(null);
    setSelectedApp(null);
    setAppData(null);
    setCurrentView('login');
  };

  // ✅ Simulate fetching app data when button clicked
  const showApp = (app) => {
    setSelectedApp(app);
    setAppData(null); // clear old data first

    // Simulate loading delay (like fetching from API)
    setTimeout(() => {
      const permission = userData.userPermissions.find(p => p.app === app);
      if (permission) {
        setAppData({
          app: permission.app,
          navs: permission.navs,
          fetchedAt: new Date().toLocaleTimeString(),
        });
      }
    }, 800); // 0.8s delay
  };

  const getAppTitle = (app) => {
    return app === 'nipun_mis' ? 'MIS Dashboard' : 'Report Dashboard';
  };

  if (currentView === 'login') {
    return (
      <div className="container">
        <h2>Dynamic Nav UI Preview - User Two</h2>
        <div className="login-view">
          <p>Click to login as User Two:</p>
          <div className="row" style={{ marginBottom: '12px' }}>
            <button className="btn btn-primary" onClick={() => simulateLogin('3557630448')}>
              Login as User (Arjun)
            </button>
          </div>
          <p style={{ color: '#6b7280' }}>
            User access with MIS Dashboard permissions.
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

            {/* ✅ show loader or data */}
            {selectedApp && !appData && <p>⏳ Fetching app data...</p>}

            {appData && (
              <div className="navs-area">
                <h4>{getAppTitle(appData.app)}</h4>
                <p><strong>Fetched at:</strong> {appData.fetchedAt}</p>
                <ul>
                  {appData.navs.map((nav, index) => (
                    <li key={index}><strong>{nav}</strong></li>
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

export default UserTwo;
