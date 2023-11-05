import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { setLogin } from "../state/authSlice";
import { useDispatch, useSelector } from "react-redux";
import styles from "../styles/UserLogin.module.css";

const UserLogin = () => {
    // State to manage the entered username and password
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    // Get the service provider token and user token from the Redux store
    const SPToken = useSelector((state) => state.SPToken);
    const token = useSelector((state) => state.token);
    // Create a navigate function to handle routing
    const navigate = useNavigate();
    // Get the dispatch function from Redux
    const dispatch = useDispatch();

    useEffect(() => {
        // If a service provider token exists, redirect to the service provider dashboard
        if (SPToken) {
            navigate("/serviceprovider");
        }
        // If a user token exists, redirect to the user dashboard
        if (token) {
            navigate("/user");
        }
    }, [SPToken, token, navigate]);

    // Function to handle user login
    const login = async () => {
        const res = await fetch("/auth/login", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ username, password }),
        });
        const data = await res.json();
        if (data.status === "fail") {
            alert(data.message);
        } else {
            // Dispatch a Redux action to set the user token
            dispatch(setLogin({ token: data.token }));
            // Redirect to the user dashboard
            navigate("/user");
        }
    };

    return (
        <div className={styles.center}>
            <form>
                <h3>Login Here</h3>

                <label>Username</label>
                <input
                    type="text"
                    placeholder="username"
                    id="username"
                    onChange={(event) => {
                        setUsername(event.target.value);
                    }}
                />

                <label>Password</label>
                <input
                    type="password"
                    placeholder="Password"
                    id="password"
                    onChange={(event) => {
                        setPassword(event.target.value);
                    }}
                />

                {/* Button to trigger the login function */}
                <div className={styles.button} onClick={login}>Log In</div>
                <div className={styles.social}>
                    {/* Links to the user signup and service provider login pages */}
                    <Link to="/usersignup">Signup</Link>
                    <Link to="/splogin">Service Provider</Link>
                </div>
            </form>
        </div>
    );
};

export default UserLogin;
