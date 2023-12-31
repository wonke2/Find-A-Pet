import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import "../styles/Profile.css";

const SPProfile = () => {
    // Get SPToken from Redux store.
    const SPToken = useSelector((state) => state.SPToken);
    // State variable to hold service provider details.
    const [serviceProvider, setServiceProvider] = useState(null);
    // Initialize the navigate function for routing.
    const navigate = useNavigate();

    // Use useEffect to fetch service provider details and handle redirects.
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
            <Link to="/spdashboard" className='dashboard-link'>Dashboard</Link>
            {serviceProvider ? (
                <>
                    <h1 className="profile-title">Welcome Back {serviceProvider.serviceProviderName}!</h1>
                    <h3 className="profile-label">Your Details: </h3>
                    <div className = 'profile-details'>
                        <ul>
                            <li><strong>Organization: </strong><div className='detail'>{serviceProvider.orgName}</div></li>
                            <li><strong>Address: </strong><div className='detail'>{serviceProvider.serviceProviderAddress}</div></li>
                            <li><strong>Email: </strong><div className='detail'>{serviceProvider.serviceProviderEmail}</div></li>
                            <li><strong>Phone Number: </strong><div className='detail'>{serviceProvider.serviceProviderPhone}</div></li>
                        </ul>
                        <p className='profile-id'><strong>Service Provider ID </strong><br /><i>{serviceProvider._id}</i></p>
                    </div>
                </>
            ) : (
                <div>
                    <h1 className='profile-title'>Service Provider Profile</h1>
                    <p className='loading-message'>Loading service provider details...</p>
                </div>
            )}
        </div>
    );
}

export default SPProfile;
