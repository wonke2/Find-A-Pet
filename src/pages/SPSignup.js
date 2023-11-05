import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import styles from "../styles/UserLogin.module.css";
import { useSelector } from "react-redux";

const SPSignup = () => {
    // State variables to manage form input and validation.
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [email, setEmail] = useState("");
    const [phoneNo, setPhoneNo] = useState("");
    const [location, setLocation] = useState("");
    const [orgName, setOrgName] = useState("");
    const [isPasswordWeak, setIsPasswordWeak] = useState(false);
    const [passwordErrorMessage, setPasswordErrorMessage] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [isConfirmPassword, setIsConfirmPassword] = useState(false);
    const [passwordsMatch, setPasswordsMatch] = useState(true);
    const [showIncompleteFieldsBanner, setShowIncompleteFieldsBanner] = useState(false);
    const [isPhoneValid, setIsPhoneValid] = useState(true);
    const [phoneErrorMessage, setPhoneErrorMessage] = useState("");
    const [isEmailValid, setIsEmailValid] = useState(true);
    const [emailErrorMessage, setEmailErrorMessage] = useState("");
    const SPToken = useSelector((state) => state.SPToken);
    const token = useSelector((state) => state.token);

    const navigate = useNavigate();

    // Check for tokens and redirect if already authenticated.
    useEffect(() => {
        if (SPToken) {
            navigate("/serviceprovider");
        }
        if (token) {
            navigate("/user");
        }
    }, [SPToken, token, navigate]);

    // Function to handle the signup process.
    const signup = async () => {
        // Check for incomplete fields.
        if (username === "" || password === "" || email === "" || phoneNo === "" || orgName === "") {
            setShowIncompleteFieldsBanner(true);
            return;
        }

        // Make a POST request to create a new service provider.
        const res = await fetch("/SPauth/SPsignup", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                serviceProviderName: username,
                serviceProviderPassword: password,
                serviceProviderEmail: email,
                serviceProviderPhone: phoneNo,
                serviceProviderAddress: location,
                orgName,
            }),
        });

        const data = await res.json();

        if (data.status === "fail") {
            alert(data.message);
        } else {
            alert("Service Provider Created");
            navigate("/SPlogin");
        }
    }

    return (
        <div className={styles.center}>
            <form>
                <h3>Service Provider Register</h3>
                <label htmlFor="businessName">Business Name <i>*</i></label>
                <input
                    type="text"
                    id="businessName"
                    required
                    onChange={(e) => {
                        setUsername(e.target.value);
                    }}
                />
                {/* More input fields and validation checks */}
                { /* ... */ }
                <div onClick={signup} disabled={!passwordsMatch || isPasswordWeak || password === "" || !isPhoneValid || !isEmailValid} className={styles.button}>Signup</div>
                <div className={styles.social}>
                    <Link to="/SPlogin"> Login </Link>
                    <Link to="/usersignup"> User Signup</Link>
                </div>
            </form>
        </div>
    )
}

export default SPSignup;
