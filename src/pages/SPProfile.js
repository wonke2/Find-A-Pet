import React, { useEffect, useState } from "react"
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom"
import { setLogout } from '../state/authSlice';
import { useDispatch } from 'react-redux';


const SPProfile = () => {
    const [SPToken, setSPToken] = useState(localStorage.getItem("SPToken"));
    const [serviceProvider, setServiceProvider] = useState(null);
    const navigate = useNavigate()
    const dispatch = useDispatch();

    const handleLogout = () => {
        dispatch(setLogout());
        navigate('/splogin');
    }

    useEffect(() => {
        if (!SPToken) {
            navigate("/splogin");
        } else {
            const fetchServiceProviderDetails = async () => {
                try {
                    const response = await fetch(`/SPauth/SPuser/`, {
                        method: "GET",
                        headers: {
                            'Authorization': `Bearer ${SPToken}`,
                        },
                    });
                    const contentType = response.headers.get("content-type");
                    if (contentType && contentType.includes("application/json")) {
                        const data = await response.json();
                        if (data.status === "success") {
                            setServiceProvider(data.data);
                        } else {
                            console.error("Failed to retrieve service provider details:", data.message);
                        }
                    } else {
                        console.error("Unexpected response content type");
                    }
                } catch (error) {
                    console.error("Error retrieving service provider details:", error);
                }
            };

            fetchServiceProviderDetails();
        }
    }, [SPToken, navigate]);

    return (
        <div>
            <h1>Service Provider Profile</h1>
            <Link to="/spdashboard">Dashboard</Link>
            <div>
                {serviceProvider ? (
                    <>
                    <h2>Welcome Back! {serviceProvider.serviceProviderName}</h2>
                        <div>
                            <p>Organization: {serviceProvider.orgName}</p>
                            <p>Address: {serviceProvider.serviceProviderAddress}</p>
                            <p>Email: {serviceProvider.serviceProviderEmail}</p>
                            <p>Phone Number: {serviceProvider.serviceProviderPhone}</p>
                        </div>
                    </>
                ) : (
                    <p>Loading service provider details...</p>
                )}
            </div>
            <button onClick={handleLogout}>Logout</button>
        </div>
    );
}

export default SPProfile;