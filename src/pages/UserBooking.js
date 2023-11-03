import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import '../styles/UserBooking.css';



const UserBookings = () => {
    const [bookings, setBookings] = useState([]);
    const [userID, setUserID] = useState(null);
    const token = useSelector((state) => state.token);
    const navigate = useNavigate();

    useEffect(() => {
        if (!token) {
            // If there's no token, redirect to the login page.
            navigate('/userlogin');
        } else {
            // Firstly, fetch the user details
            fetch("http://localhost:3000/auth/user", {
                headers: {
                    "Authorization": `Bearer ${token}`,
                },
            })
                .then((res) => res.json())
                .then((data) => {
                    setUserID(data.data._id);

                    // After getting the userID, fetch the bookings
                    return fetch(`http://localhost:3000/auth/user-bookings/${data.data._id}`, {
                        headers: {
                            "Authorization": `Bearer ${token}`,
                        },
                    });
                })
                .then((res) => res.json())
                .then((data) => setBookings(data))
                .catch((error) => console.error("Error fetching user bookings:", error));
        }
    }, [token, navigate]);

    return (
        <div className="user-bookings-container">
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
