import React, { useState } from "react"
import { useNavigate } from "react-router-dom"
import styles from "../styles/UserLogin.module.css"
import { setSPToken } from '../state/authSlice'
import { useDispatch } from "react-redux"
import { Link } from "react-router-dom"

const SPLogin = () => {
    const [username, setUsername] = useState("")
    const [password, setPassword] = useState("")
    const [SPToken, setsPToken] = useState(localStorage.getItem("SPToken"));
    const [token, setToken] = useState(localStorage.getItem("token"))
    const navigate = useNavigate()
    const dispatch = useDispatch()

    useEffect(() => {
        if (SPToken) {
            navigate("/serviceprovider");
        }
        if (token) {
            navigate("/user");
        }
    }, [SPToken, token, navigate])
    
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
            alert("Username or Password is incorrect")
            window.location.reload()
        } else {
            if (data.status === 'success' && data.SPToken) {
                dispatch(setSPToken({ SPToken: data.SPToken }))
                localStorage.setItem('SPToken', data.SPToken)
                navigate('/')
            }
            else {
                alert("Login Failed. Contact Administrator", data.SPToken, " ", data.status, " ", data.message)
            }
        }
    }
    return (
        <div className={styles.center}>
            <form>
                <h3>Service Provider Login</h3>

                <label htmlFor="username">Business Name</label>
                <input
                    required
                    type="text"
                    placeholder="Business Name"
                    id='username'
                    onChange={(e) => {
                        setUsername(e.target.value)
                    }}
                />

                <label htmlFor="password">Password</label>
                <input
                    type="password"
                    placeholder="Password"
                    id="password"
                    required
                    onChange={(e) => {
                        setPassword(e.target.value)
                    }}
                />

                <div className={styles.button} onClick={login}>Log In</div>
                <div className={styles.social}>
                    <Link to="/SPsignup">Signup</Link>
                    <Link to="/userlogin">User Login</Link>
                </div>
            </form>
        </div>
    )
}

export default SPLogin