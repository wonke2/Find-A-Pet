import React, { useState } from "react"
import { useNavigate } from "react-router-dom"
import "../styles/SPSignup.css"
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
    const [passwordsMatch, setPasswordsMatch] = useState(true);
    const [showIncompleteFieldsBanner, setShowIncompleteFieldsBanner] = useState(false);
    const [isPhoneValid, setIsPhoneValid] = useState(true);
    const [phoneErrorMessage, setPhoneErrorMessage] = useState("");
    const [isEmailValid, setIsEmailValid] = useState(true);
    const [emailErrorMessage, setEmailErrorMessage] = useState("");

    const navigate = useNavigate();

    const login = async () => {
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
        <>
            <div className="SP_main_form_signup">
                <h1>Service Provider Signup</h1>
                <div className="SP_form_inp">
                    <label htmlFor="businessName">*Business Name:</label>
                    <input
                        type="text"
                        id="businessName"
                        required
                        onChange={(e) => {
                            setUsername(e.target.value)
                        }}
                    />
                    <br/>
                    <label htmlFor="organizationName">*Organization Name:</label>
                    <input
                        type="text"
                        id="organizationName"
                        required
                        onChange={(e) => {
                            setOrgName(e.target.value);
                        }}
                    />
                    <br/>
                    <label htmlFor="password">*Password:</label>
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
                    <label htmlFor="confirmPassword">*Confirm Password:</label>
                    <input
                        type="password"
                        id="confirmPassword"
                        required
                        onChange={(e) => {
                            setConfirmPassword(e.target.value);
                            setPasswordsMatch(e.target.value === password);
                        }}
                    />
                    <br/>
                    <label htmlFor="email">*Email:</label>
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
                    <br/>
                    <label htmlFor="phoneNo">*Phone Number:</label>
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
                                setPhoneErrorMessage("Phone number must be 10 digits.");
                            } else {
                                setPhoneErrorMessage("");
                            }
                        }}
                    />
                    <br/>
                    <label htmlFor="location">Location:</label>
                    <textarea
                        name=""
                        id="location"
                        rows="3"
                        onChange={(e) => {
                            setLocation(e.target.value)
                        }}
                    />
                    <br/>
                    <button onClick={login} disabled={!passwordsMatch || isPasswordWeak || password === "" || !isPhoneValid || !isEmailValid}>Signup</button>
                </div>
                {showIncompleteFieldsBanner && (
                    <div className="incomplete-fields-banner">
                        Please fill out all required (*) fields.
                    </div>
                )}
                {isPasswordWeak && (
                        <div className="password-banner">
                            {passwordErrorMessage}
                        </div>
                )}
                {!isPhoneValid && (
                    <div className="phone-error-banner">
                        {phoneErrorMessage}
                    </div>
                )}
                {!isEmailValid && (
                    <div className="email-error-banner">
                        {emailErrorMessage}
                    </div>
                )}

            </div>
        </>
    )
}

export default SPSignup