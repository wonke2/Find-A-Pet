import React from "react";
import { Link } from "react-router-dom";
import "../styles/SPDash.css";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch } from 'react-redux';
import { setLogout } from '../state/authSlice';

const SPDashboard = () => {
    const navigate = useNavigate();
    const [bookings, setBookings] = useState([]);
    const [SPToken, setSPToken] = useState(localStorage.getItem("SPToken"));
    const [loading, setLoading] = useState(true);
    const dispatch = useDispatch();
    const [serviceProvider, setServiceProvider] = useState(null);

    useEffect(() => {
        if (!SPToken) {
            navigate("/splogin");
        } else {
            const fetchBookings = async () => {
                try {
                    const response = await fetch(`/bookings`, {
                        method: 'GET',
                        headers: {
                            'Authorization': `Bearer ${SPToken}`
                        }
                    });
                    const data = await response.json();
                    setBookings(data);
                    setLoading(false);
                } catch (error) {
                    console.error("Error fetching bookings:", error);
                    setLoading(false);
                }
            }

            const fetchServiceProviderDetails = async () => {
                try {
                    const response = await fetch(`/SPauth/SPuser/`, {
                        method: "GET",
                        headers: {
                        Authorization: `Bearer ${SPToken}`,
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
            fetchBookings();
        }
    }, [SPToken, navigate]);

    const handleLogout = () => {
        dispatch(setLogout());
        navigate('/splogin');
    }

    return (
        <div>
            <h1>Service Provider Dashboard</h1>
            <Link to="/spdashboard/addservice">Add a Service</Link>
                <div>
                    <h1>Service Provider Details</h1>
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
                        <p>Loading...</p>
                    )}
                </div>
            {loading ? <p>Loading...</p> : (
            <div>
                {bookings.map(booking => (
                    <div key={booking._id}>
                        <ul>
                            <li>Booking ID: {booking._id}</li>
                            <li>Service ID: {booking.serviceID}</li>
                            <li>User ID: {booking.userID}</li>
                            <li>Booking Date: {booking.Date}</li>
                            <li>Booking Location: {booking.location}</li>
                            <li>Booking Status: {booking.status}</li>
                        </ul>
                    </div>
                ))}
            </div>
            )}
            <button onClick={handleLogout}>Logout</button>
        </div>
    );
}

export default SPDashboard;
