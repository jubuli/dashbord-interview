// import React, { useState, useEffect } from 'react';
// import './DynamicNav.css';

// const UserTwo = () => {
//   const [currentView, setCurrentView] = useState('login');
//   const [userData, setUserData] = useState(null);
//   const [selectedApp, setSelectedApp] = useState(null);

//   const mockResponses = {
//     "3557630448": {
//       firstName: "Arjun",
//       userName: "Arjun Mishra",
//       userCategory: "user",
//       userImage: "https://i.pravatar.cc/150?img=12",
//       userPermissions: [
//         { app: "nipun_mis", navs: ["misCot", "misSopan", "misMcm"] }
//       ]
//     }
//   };
    
//   useEffect(() => {
//     const savedUserData = localStorage.getItem('userTwoData');
//     if (savedUserData) {
//       setUserData(JSON.parse(savedUserData));
//       setCurrentView('dashboard');
//     }
//   }, []);

//   const simulateLogin = (authId) => {
//     const data = mockResponses[authId];
//     if (!data) {
//       alert('No mock for that id');
//       return;
//     }
//     localStorage.setItem('userTwoData', JSON.stringify(data));
//     setUserData(data);
//     setCurrentView('dashboard');
//   };

//   const logout = () => {
//     localStorage.removeItem('userTwoData');
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

//   if (currentView === 'login') {
//     return (
//       <div className="container">
//         <h2>Dynamic Nav UI Preview - User Two</h2>
//         <div className="login-view">
//           <p>Click to login as User Two:</p>
//           <div className="row" style={{ marginBottom: '12px' }}>
//             <button className="btn btn-primary" onClick={() => simulateLogin('3557630448')}>
//               Login as User (Arjun)
//             </button>
//           </div>
//           <p style={{ color: '#6b7280' }}>
//             User Two - Limited access with basic permissions.
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
//               <div className="user-category">{userData.userCategory}</div>
//             </div>
            
//             <h4>Apps</h4>
//             <ul className="apps-list">
//               {userData.userPermissions.map((permission, index) => (
//                 <li key={index}>
//                   <button 
//                     className="btn btn-ghost app-btn"
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

// export default UserTwo;





import React, { useState, useEffect } from 'react';
// import './DynamicNav.css';

const UserTwo = () => {
  const [currentView, setCurrentView] = useState('login');
  const [userData, setUserData] = useState(null);
  const [selectedApp, setSelectedApp] = useState(null);

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
      
      // Automatically select and fetch nipun_mis app
      const nipunMisApp = user.userPermissions.find(permission => permission.app === "nipun_mis");
      if (nipunMisApp) {
        setSelectedApp("nipun_mis");
      }
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
    
    // Automatically select and fetch nipun_mis app after login
    const nipunMisApp = data.userPermissions.find(permission => permission.app === "nipun_mis");
    if (nipunMisApp) {
      setSelectedApp("nipun_mis");
    }
  };

  const logout = () => {
    localStorage.removeItem('userTwoData');
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

  // Get nipun_mis app data
  const getNipunMisData = () => {
    if (!userData) return null;
    return userData.userPermissions.find(permission => permission.app === "nipun_mis");
  };

  const nipunMisData = getNipunMisData();

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
            
            {selectedApp && nipunMisData && (
              <div className="navs-area">
                <h4>Navigation - {getAppTitle("nipun_mis")}</h4>
                <div className="app-info">
               
                  <p><strong>app:</strong> {nipunMisData.app}</p>
                 
                </div>
                <ul>
                  {nipunMisData.navs.map((nav, index) => (
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

export default UserTwo;