import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';// Access Redux store state
import { useNavigate, Link } from 'react-router-dom'; // For navigation and linking to routes
import '../styles/UserBooking.css'; // User booking specific styles

// UserBookings component to display the current user's bookings
const UserBookings = () => {
    const [bookings, setBookings] = useState([]); // State for storing bookings
    const [userID, setUserID] = useState(null); // State to store user ID
    const token = useSelector((state) => state.token); // Retrieve the auth token from the Redux store
    const navigate = useNavigate(); // Hook to programmatically navigate

    useEffect(() => {
        if (!token) {
            // If there's no token, redirect to the login page.
            navigate('/userlogin');
        } else {
            // Fetch user details if token is available
            fetch("/auth/user", {
                headers: {
                    "Authorization": `Bearer ${token}`,
                },
            })
                .then((res) => res.json())
                .then((data) => {
                    // Store user ID from fetched data
                    setUserID(data.data._id);

                    // Fetch the bookings for the logged-in user using the userID
                    return fetch(`/auth/user-bookings/${data.data._id}`, {
                        headers: {
                            "Authorization": `Bearer ${token}`,
                        },
                    });
                })
                .then((res) => res.json())
                // Update state with the fetched bookings
                .then((data) => setBookings(data))
                .catch((error) => console.error("Error fetching user bookings:", error));
        }
    }, [token, navigate]);

    // Render the UserBooking component
    return (
        <div className="user-bookings-container">
            <Link to="/userdashboard" className="userdashboard-link">Back to Dashboard</Link>
            <h2>Your Bookings:</h2>
            {bookings.map((booking, index) => (
                <div key={index} className="booking-card">
                    <p>Service: <span className="booking-service-name">{booking.service.serviceName}</span></p>
                    <p>Provider: <span className="booking-provider-name">{booking.serviceProviderName}</span></p>
                    <p>Date: <span className="booking-date">{new Date(booking.bookingDate).toLocaleDateString()}</span></p>
                </div>
            ))}
        </div>

    );
};

export default UserBookings;
