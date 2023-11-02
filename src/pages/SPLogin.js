import React, { useState } from "react"
import { useNavigate } from "react-router-dom"
import "../styles/SPLogin.css"
import { setSPToken } from '../state/authSlice'
import { useDispatch } from "react-redux"
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
            alert("Login Failed 1")
        } else {
            if (data.status === 'success' && data.SPToken) {
                console.log("Setting SPToken in local storage:", data.SPToken);
                dispatch(setSPToken({ SPToken: data.SPToken }))
                localStorage.setItem('SPToken', data.SPToken)
                console.log("SPToken should be set:", localStorage.getItem('SPToken'))
                navigate('/')
            }
            else {
                alert("Login Failed 2", data.SPToken, " ", data.status, " ", data.message)
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