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

    const navigate = useNavigate();

    const login = async () => {
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
            <div classNamee="SP_main_form_signup">
                <h1>Service Provider Signup</h1>
                <div className="SP_form_inp">
                    <input
                        type="text"
                        placeholder="Business Name"
                        required
                        onChange={(e) => {
                            setUsername(e.target.value)
                        }}
                    />
                    <input
                        type="text"
                        placeholder="Organization Name"
                        required
                        onChange={(e) => {
                            setOrgName(e.target.value);
                        }}
                    />
                    <input
                        type="password"
                        placeholder="Password"
                        pattern="(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}"
                        title="Must contain at least one number and one uppercase and lowercase letter, and at least 8 or more characters"
                        required
                        onChange={(e) => {
                            setPassword(e.target.value)
                        }}
                    />
                    <input
                        type="text"
                        placeholder="Email"
                        required
                        onChange={(e) => {
                            setEmail(e.target.value)
                        }}
                    />
                    <input
                        type="tel"
                        required
                        placeholder="Phone Number"
                        pattern ="/^\d{10}$/"
                        onChange={(e) => {
                            setPhoneNo(e.target.value)
                        }}
                    />
                    <textarea
                        name=""
                        id=""
                        rows="3"
                        required
                        placeholder="Location"
                        onChange={(e) => {
                            setLocation(e.target.value)
                        }}
                    />
                    <button onClick={login}>Signup</button>
                </div>
            </div>
        </>
    )
}

export default SPSignup