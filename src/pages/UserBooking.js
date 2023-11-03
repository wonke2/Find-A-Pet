import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import '../styles/UserBookings.css';



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
        <div>
            <h2>Your Bookings:</h2>
            {bookings.map((booking, index) => (
                <div key={index}>
                    <p>Service: {booking.service.serviceName}</p> 
                    <p>Provider: {booking.serviceProviderName}</p> 
                    <p>Date: {new Date(booking.bookingDate).toLocaleDateString()}</p>
                </div>
            ))}
        </div>
    );
};

export default UserBookings;
