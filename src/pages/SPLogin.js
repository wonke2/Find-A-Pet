import React, { useState } from "react"
import { useNavigate } from "react-router-dom"
import "../styles/SPLogin.css"
import { setSPToken } from '../state/authSlice'
const SPLogin = () => {
    const [username, setUsername] = useState("")
    const [password, setPassword] = useState("")
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const login = async () => {
        const res = await fetch("/SPauth/SPlogin", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                serviceProviderName: username,
                serviceProviderPassword: password,
            }),
        })
        const data = await res.json()
        if (data.status === "fail") {
            alert()
        } else {
            if (data.status === 'success') {
                dispatch(setSPToken({ SPToken: data.SPToken }));
                navigate('/spdashboard');
            }
        }
    }
    return (
        <>
            <div className="main_form">
                <h1>Service Provider Login</h1>
                <div className="form_inp">
                    <input
                        required
                        type="text"
                        placeholder="Business Name"
                        onChange={(e) => {
                            setUsername(e.target.value)
                        }}
                    />
                    <input
                        type="password"
                        placeholder="Password"
                        required
                        onChange={(e) => {
                            setPassword(e.target.value)
                        }}
                    />
                    <button className="login_button" onClick={login}>
                        Login
                    </button>
                </div>
            </div>
        </>
    )
}

export default SPLogin