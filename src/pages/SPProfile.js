import React, { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"

const SPProfile = () => {
    const [loading, setLoading] = useState(true)
    const [user, setUser] = useState(null)
    const navigate = useNavigate()
    useEffect(() => {
        const token = localStorage.getItem("token")
        if (!token) {
            navigate("/SPlogin")
        } else {
            fetch("/SPauth/sp", {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            })
                .then((res) => res.json())
                .then((data) => {
                    if (data.status === "fail") {
                        navigate("/splogin")
                    } else {
                        setUser(data.data)
                        setLoading(false)
                    }
                })
        }
    }, [navigate])
    console.log(user)
    return loading ? (
        <h1>Loading...</h1>
    ) : (
        <div>
            <h1>Service Provider Profile</h1>
            <h2>Service Provider Name: {user.serviceProviderName}</h2>
            <h2>Organization Name: {user.orgName}</h2>
            <h2>Address: {user.serviceProviderAddress}</h2>
            <h2>Email: {user.serviceProviderEmail}</h2>
            <h2>Phone No: {user.serviceProviderPhone}</h2>
        </div>
    )
}