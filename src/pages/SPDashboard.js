import React from "react";
import { Link } from "react-router-dom";
import "../styles/SPDash.css";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch } from 'react-redux';
import { setLogout } from '../state/authSlice';

const SPDashboard = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const [SPToken, setSPToken] = useState(localStorage.getItem("SPToken"));
    const [serviceProvider, setServiceProvider] = useState(null);

    useEffect(() => {
        if (!SPToken) {
            navigate("/splogin");
        } else {
            // Fetch service provider details only
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
                    }
                    else {
                        console.error("Unexpected response content type");
                    }
                } catch (error) {
                    console.error("Error retrieving service provider details:", error);
                }
            };

            fetchServiceProviderDetails();
        }
    }, [SPToken, navigate]);

    const handleLogout = () => {
        dispatch(setLogout());
        navigate('/splogin');
    }

    return (
        <div>
            <h1>Service Provider Dashboard</h1>
            <Link to="/spdashboard/sp-services">View Services</Link>
            <Link to="/spdashboard/sp-bookings">View Bookings</Link> {/* Link to the SPBookings component */}
            <div>
                <h2>Service Provider Details</h2>
                {serviceProvider ? (
                    <div>
                        <p>Service Provider Name: {serviceProvider.serviceProviderName}</p>
                        <p>Organization Name: {serviceProvider.orgName}</p>
                        <p>Service Provider Address: {serviceProvider.serviceProviderAddress}</p>
                        <p>Service Provider Email: {serviceProvider.serviceProviderEmail}</p>
                        <p>Service Provider Phone: {serviceProvider.serviceProviderPhone}</p>
                        {/* Display other details as needed */}
                    </div>
                ) : (
                    <p>Loading service provider details...</p>
                )}
            </div>
            <button onClick={handleLogout}>Logout</button>
        </div>
    );
}

export default SPDashboard;
