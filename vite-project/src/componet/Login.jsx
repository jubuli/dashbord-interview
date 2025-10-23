


// import React, { useState } from "react";
// import axios from "axios";

// const Login = () => {
//     const [authId, setAuthId] = useState("");
//     const [password, setPassword] = useState("");
//     const [message, setMessage] = useState("");

//     const handleSubmit = async (e) => {
//         e.preventDefault();

//         if (!authId || !password) {
//             setMessage("Please enter both fields");
//             return;
//         }

//         try {
//             const response = await axios.post(
//                 "https://tatvagyan.co.in/nipun/authUser",
//                 {
//                     appType: "web",
//                     authId: "0237201410",
//                     password: "hashedPass123$%",
//                 },
//                 {
//                     headers: {
//                         "api-key":
//                             "2f5a9e4f965022c43f2c91836ee2278d0f5b20b5cb1144e77f7ec7533e771b01",
//                         "Content-Type": "application/json",
//                     },
//                 }
//             );

//             console.log("Response:", response.data);
//             setMessage("Login successful ");


//             const { userData } = response.data;
//             localStorage.setItem("userData", JSON.stringify(userData));

//             if (userData.userType === "observer" && userData.userCode === "0237201410") {
//                 navigate("/dashboard/user1");   // First user dashboard
//             } else if (userData.userType === "observer" && userData.userCode === "3557630448") {
//                 navigate("/dashboard/user2");   // Second user dashboard
//             } else if (userData.userType === "admin") {
//                 navigate("/dashboard/admin");   // Admin dashboard
//             } else {
//                 setMessage("Unknown user type"); // If credentials are not recognized
//             }

//         } catch (error) {
//             console.error("Error:", error.response?.data || error.message);
//             setMessage("Login failed  — please check credentials");
//         }
//     };

//     return (
//         <div style={styles.container}>
//             <h2>Login Page</h2>
//             <form onSubmit={handleSubmit} style={styles.form}>
//                 <input
//                     type="text"
//                     placeholder="Enter authId"
//                     value={authId}
//                     onChange={(e) => setAuthId(e.target.value)}
//                     style={styles.input}
//                 />

//                 <input
//                     type="password"
//                     placeholder="Enter password"
//                     value={password}
//                     onChange={(e) => setPassword(e.target.value)}
//                     style={styles.input}
//                 />

//                 <button type="submit" style={styles.button}>Login</button>
//             </form>

//             {message && <p style={{ marginTop: "15px" }}>{message}</p>}
//         </div>
//     );
// };

// // Basic styles
// const styles = {
//     container: {
//         width: "350px",
//         margin: "100px auto",
//         padding: "30px",
//         border: "1px solid #ccc",
//         borderRadius: "10px",
//         textAlign: "center",
//     },
//     form: {
//         display: "flex",
//         flexDirection: "column",
//         gap: "15px",
//     },
//     input: {
//         padding: "10px",
//         fontSize: "16px",
//     },
//     button: {
//         padding: "10px",
//         backgroundColor: "#007bff",
//         color: "white",
//         border: "none",
//         borderRadius: "5px",
//         cursor: "pointer",
//     },
// };

// export default Login;
import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Login = () => {
    const [authId, setAuthId] = useState("");
    const [password, setPassword] = useState("");
    const [message, setMessage] = useState("");
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!authId || !password) {
            setMessage("Please enter both fields");
            return;
        }

        try {
            const response = await axios.post(
                "https://tatvagyan.co.in/nipun/authUser",
                {
                    appType: "web",
                    authId: "3557630448",
                    
                    password: "uniquePass526@#",    
                },
                {
                    headers: {
                        "api-key":
                            "2f5a9e4f965022c43f2c91836ee2278d0f5b20b5cb1144e77f7ec7533e771b01",
                        "Content-Type": "application/json",
                    },
                }
            );

            console.log("Response:", response.data);
            setMessage("Login successful ");

            const { userData } = response.data;
            localStorage.setItem("userData", JSON.stringify(userData));

            // Redirect to dashboard based on user
            if (userData.userType === "observer" && userData.userCode === "0237201410") {
                navigate("/dashboard/user1");
            } else if (userData.userType === "observer" && userData.userCode === "3557630448") {
                navigate("/dashboard/user2");
            } else if (userData.userType === "admin") {
                navigate("/dashboard/admin");
            } else {
                setMessage("Unknown user type ");
            }
        } catch (error) {
            console.error("Error:", error.response?.data || error.message);
            setMessage("Login failed  — please check credentials");
        }
    };

    return (
        <div style={styles.container}>
            <h2>Login Page</h2>
            <form onSubmit={handleSubmit} style={styles.form}>
                <input
                    type="text"
                    placeholder="Enter authId"
                    value={authId}
                    onChange={(e) => setAuthId(e.target.value)}
                    style={styles.input}
                />

                <input
                    type="password"
                    placeholder="Enter password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    style={styles.input}
                />

                <button type="submit" style={styles.button}>Login</button>
            </form>

            {message && <p style={{ marginTop: "15px" }}>{message}</p>}
        </div>
    );
};

const styles = {
    container: {
        width: "350px",
        margin: "100px auto",
        padding: "30px",
        border: "1px solid #ccc",
        borderRadius: "10px",
        textAlign: "center",
    },
    form: {
        display: "flex",
        flexDirection: "column",
        gap: "15px",
    },
    input: {
        padding: "10px",
        fontSize: "16px",
    },
    button: {
        padding: "10px",
        backgroundColor: "#007bff",
        color: "white",
        border: "none",
        borderRadius: "5px",
        cursor: "pointer",
    },
};

export default Login;

