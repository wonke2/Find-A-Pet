import React, { useState } from "react"
import { useNavigate } from "react-router-dom"
import { Link } from "react-router-dom"
import styles from "../styles/UserLogin.module.css"

const SPSignup = () => {
    const [username, setUsername] = useState("")
    const [password, setPassword] = useState("")
    const [email, setEmail] = useState("")
    const [phoneNo, setPhoneNo] = useState("")
    const [location, setLocation] = useState("")
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

    const navigate = useNavigate();

    const signup = async () => {
        if (username === "" || password === "" || email === "" || phoneNo === "" || orgName === "") {
            setShowIncompleteFieldsBanner(true);
            return;
        }   
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
                orgName
            })
        })
        const data = await res.json()
        if (data.status === "fail") {
            alert(data.message)
        } else {
            alert("Service Provider Created")
            navigate("/SPlogin")
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
                        setUsername(e.target.value)
                    }}
                />

                <label htmlFor="organizationName">Organization Name <i>*</i></label>
                <input
                    type="text"
                    id="organizationName"
                    required
                    onChange={(e) => {
                        setOrgName(e.target.value);
                    }}
                />
                
                <label htmlFor="password">Password <i>*</i></label>
                <input
                    type="password"
                    id="password"
                    required
                    onChange={(e) => {
                        const newPassword = e.target.value;
                        setPassword(newPassword)
                        setPasswordsMatch(newPassword === confirmPassword);
                        const isWeak = !/(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}/.test(newPassword);
                        setIsPasswordWeak(isWeak);
                        if (isWeak) {
                            setPasswordErrorMessage("Password is too weak.");
                        } else {
                            setPasswordErrorMessage("");
                        }
                    }}
                />
                <br/>
                <label htmlFor="confirmPassword">Confirm Password <i>*</i></label>
                <input
                    type="password"
                    id="confirmPassword"
                    required
                    onChange={(e) => {
                        setConfirmPassword(e.target.value);
                        setPasswordsMatch(e.target.value === password);
                        setIsConfirmPassword(e.target.value === password);
                        if (e.target.value !== password) {
                            setPasswordErrorMessage("Passwords do not match.");
                        }
                        else {
                            setPasswordErrorMessage("");
                        }
                    }}
                />
                <label htmlFor="email">Email <i>*</i></label>
                <input
                    type="text"
                    id="email"
                    required
                    onChange={(e) => {
                        setEmail(e.target.value)
                                const isEmailPatternValid = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(e.target.value);
                        setIsEmailValid(isEmailPatternValid);
                        if (!isEmailPatternValid) {
                            setEmailErrorMessage("Invalid email address.");
                        } else {
                            setEmailErrorMessage("");
                        }
                    }}
                />
                <label htmlFor="phoneNo">Phone Number <i>*</i></label>
                <input
                    type="tel"
                    required
                    id="phoneNo"
                    pattern ="/^\d{10}$/"
                    onChange={(e) => {
                        setPhoneNo(e.target.value)
                        const isPhonePatternValid = /^\d{10}$/.test(e.target.value);
                        setIsPhoneValid(isPhonePatternValid);
                        if (!isPhonePatternValid) {
                            setPhoneErrorMessage("Invalid Phone Number.");
                        } else {
                            setPhoneErrorMessage("");
                        }
                    }}
                />
                <label htmlFor="location">Location</label>
                <textarea
                    name=""
                    id="location"
                    rows="3"
                    onChange={(e) => {
                        setLocation(e.target.value)
                    }}
                />
                {showIncompleteFieldsBanner && (
                    <p className={styles.err}>
                        Please fill out all required (*) fields.
                    </p>
                )}
                {isPasswordWeak || !isConfirmPassword && (
                        <p className={styles.err}>
                            {passwordErrorMessage}
                        </p>
                )}
                {!isPhoneValid && (
                    <p className={styles.err}>
                        {phoneErrorMessage}
                    </p>
                )}
                {!isEmailValid && (
                    <p className={styles.err}>
                        {emailErrorMessage}
                    </p>
                )}
                <div onClick={signup} disabled={!passwordsMatch || isPasswordWeak || password === "" || !isPhoneValid || !isEmailValid} className={styles.button}>Signup</div>
                <div className={styles.social}>
                    <Link to="/SPlogin"> Login </Link>
                    <Link to="/usersignup"> User Signup</Link>
                </div>
            </form>
        </div>
    )
}

export default SPSignup