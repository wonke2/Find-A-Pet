import React, { useEffect, useState } from "react"
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom"
import { setLogout } from '../state/authSlice';
import { useSelector, useDispatch } from "react-redux";
import "../styles/Profile.css";

const SPProfile = () => {
    const SPToken = useSelector((state) => state.SPToken);
    const [serviceProvider, setServiceProvider] = useState(null);
    const navigate = useNavigate()

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
        <div className='profile-container'>
            <h1 className='profile-title'>Service Provider Profile</h1>
            <Link to="/spdashboard" className='dashboard-link'>Dashboard</Link>
            <div>
                {serviceProvider ? (
                    <>
                    <h2>Welcome Back! {serviceProvider.serviceProviderName}</h2>
                        <div className='sp-details'>
                            <p>Organization: {serviceProvider.orgName}</p>
                            <p>Address: {serviceProvider.serviceProviderAddress}</p>
                            <p>Email: {serviceProvider.serviceProviderEmail}</p>
                            <p>Phone Number: {serviceProvider.serviceProviderPhone}</p>
                        </div>
                    </>
                ) : (
                    <p className='loading-message'>Loading service provider details...</p>
                )}
            </div>
        </div>
    );
}

export default SPProfile;