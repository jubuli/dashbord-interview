
// import React, { useState, useEffect } from 'react';
// import './DynamicNav.css';

// const UserOne = () => {
//   const [currentView, setCurrentView] = useState('login');
//   const [userData, setUserData] = useState(null);
//   const [selectedApp, setSelectedApp] = useState(null);

//   const mockResponses = {
//     "0237201410": {
//       firstName: "Ramesh",
//       userName: "rameshpatra",
//       userId: "rameshpatra_ac0889ac",
//       userCode: "0237201410",
//       userImage: "https://example.com/images/ramesh.jpg",
//       userEmail: "rameshpatra@gmail.com",
//       userCategory: "user",
//       userType: "observer",
//       userPermissions: [
//         {
//           app: "nipun_report",
//           navs: ["reportDashboard", "reportCot", "reportSopan", "reportSpot"],
//           _id: "68f9bb360e1d8f3cfc5a91e2"
//         }
//       ]
//     }
//   };

//   useEffect(() => {
//     const savedUserData = localStorage.getItem('userData');
//     if (savedUserData) {
//       setUserData(JSON.parse(savedUserData));
//       setCurrentView('dashboard');
      
//       // Automatically select nipun_report app if user has only one app
//       const user = JSON.parse(savedUserData);
//       if (user.userPermissions.length === 1) {
//         setSelectedApp(user.userPermissions[0].app);
//       }
//     }
//   }, []);

//   const simulateLogin = (authId) => {
//     const data = mockResponses[authId];
//     if (!data) {
//       alert('No mock for that id');
//       return;
//     }
//     localStorage.setItem('userData', JSON.stringify(data));
//     setUserData(data);
//     setCurrentView('dashboard');
    
//     // Automatically select nipun_report app after login
//     if (data.userPermissions.length === 1) {
//       setSelectedApp(data.userPermissions[0].app);
//     }
//   };

//   const logout = () => {
//     localStorage.removeItem('userData');
//     setUserData(null);
//     setSelectedApp(null);
//     setCurrentView('login');
//   };

//   const showApp = (app) => {
//     setSelectedApp(app);
//   };

//   const getAppTitle = (app) => {
//     return app === 'nipun_mis' ? 'MIS Dashboard' : 'Report Dashboard';
//   };

//   // Automatically show nipun_report navigation when component loads
//   useEffect(() => {
//     if (userData && userData.userPermissions.length === 1) {
//       setSelectedApp(userData.userPermissions[0].app);
//     }
//   }, [userData]);

//   if (currentView === 'login') {
//     return (
//       <div className="container">
//         <h2>Dynamic Nav UI Preview</h2>
//         <div className="login-view">
//           <p>Click to login as User:</p>
//           <div className="row" style={{ marginBottom: '12px' }}>
//             <button className="btn btn-primary" onClick={() => simulateLogin('0237201410')}>
//               Login as User (Ramesh)
//             </button>
//           </div>
//           <p style={{ color: '#6b7280' }}>
//             User access with report permissions only.
//           </p>
//         </div>
//       </div>
//     );
//   }

//   return (
//     <div className="container">
//       <div className="dashboard-view">
//         <div className="layout">
//           <div className="sidebar">
//             <div className="user-profile">
//               {/* <img className="avatar" src={userData.userImage} alt="avatar" /> */}
//               <div className="user-name">{userData.userName}</div>
//               <div className="user-email">{userData.userEmail}</div>
//               <div className="user-category">{userData.userCategory} • {userData.userType}</div>
//               <div className="user-code">ID: {userData.userCode}</div>
//             </div>
            
//             <h4>Apps ddd</h4>
//             <ul className="apps-list">
//               {userData.userPermissions.map((permission, index) => (
//                 <li key={permission._id || index}>
//                   <button 
//                     className={`btn btn-ghost app-btn ${selectedApp === permission.app ? 'active' : ''}`}
//                     onClick={() => showApp(permission.app)}
//                   >
//                     {getAppTitle(permission.app)}
//                   </button>
//                 </li>
//               ))}
//             </ul>
            
//             <hr />
//             <button className="btn btn-ghost" onClick={logout}>
//               Logout
//             </button>
//           </div>

//           <div className="main">
//             <h3 className="app-title">
//               {selectedApp ? getAppTitle(selectedApp) : 'Select an app'}
//             </h3>
            
//             {selectedApp && (
//               <div className="navs-area">
//                 <h4>Navigation</h4>
//                 <ul>
//                   {userData.userPermissions
//                     .find(p => p.app === selectedApp)
//                     .navs.map((nav, index) => (
//                       <li key={index}>{nav}</li>
//                     ))
//                   }
//                 </ul>
//               </div>
//             )}
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default UserOne;






import React, { useState, useEffect } from 'react';
import './DynamicNav.css';

const UserOne = () => {
  const [currentView, setCurrentView] = useState('login');
  const [userData, setUserData] = useState(null);
  const [selectedApp, setSelectedApp] = useState(null);

  const mockResponses = {
    "0237201410": {
      firstName: "Ramesh",
      userName: "rameshpatra",
      userId: "rameshpatra_ac0889ac",
      userCode: "0237201410",
      userImage: "https://example.com/images/ramesh.jpg",
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
      
      // Automatically select and fetch nipun_report app
      const nipunReportApp = user.userPermissions.find(permission => permission.app === "nipun_report");
      if (nipunReportApp) {
        setSelectedApp("nipun_report");
      }
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
    
    // Automatically select and fetch nipun_report app after login
    const nipunReportApp = data.userPermissions.find(permission => permission.app === "nipun_report");
    if (nipunReportApp) {
      setSelectedApp("nipun_report");
    }
  };

  const logout = () => {
    localStorage.removeItem('userData');
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

  // Get nipun_report app data
  const getNipunReportData = () => {
    if (!userData) return null;
    return userData.userPermissions.find(permission => permission.app === "nipun_report");
  };

  const nipunReportData = getNipunReportData();

  if (currentView === 'login') {
    return (
      <div className="container">
        <h2>Dynamic Nav UI Preview</h2>
        <div className="login-view">
          <p>Click to login as User:</p>
          <div className="row" style={{ marginBottom: '12px' }}>
            <button className="btn btn-primary" onClick={() => simulateLogin('0237201410')}>
              Login as User (Ramesh)
            </button>
          </div>
          <p style={{ color: '#6b7280' }}>
            User access with report permissions only.
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
              {/* <img className="avatar" src={userData.userImage} alt="avatar" /> */}
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
            
            {selectedApp && nipunReportData && (
              <div className="navs-area">
                <h4>Navigation - {getAppTitle("nipun_report")}</h4>
                <div className="app-info">
             
                  <p><strong>app:</strong> {nipunReportData.app}</p>
                </div>
                <ul>
                  {nipunReportData.navs.map((nav, index) => (
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

export default UserOne;