import React, { useState, useEffect } from 'react';

const SPBooking = () => {
    const [bookings, setBookings] = useState([]);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const SPToken = localStorage.getItem('SPToken');

        if (SPToken) {
            // Fetch the service provider's ID first
            fetch("/SPAuth/SPuser/", {
                headers: {
                    "Authorization": `Bearer ${SPToken}`,
                },
            })
            .then((res) => {
                if (!res.ok) {
                    throw new Error(`Server responded with status: ${res.status} for SP user request`);
                }
                return res.json();
            })
            .then((data) => {
                console.log('SPuser data:', data); 
                if (data && data.data && data.data.id) {
                    // After getting the serviceProviderID, fetch the bookings
                    return fetch(`/SPAuth/bookings/service-provider/${data.data.id}`, {
                        headers: {
                            "Authorization": `Bearer ${SPToken}`,
                        },
                    });
                } else {
                    throw new Error('Failed to retrieve service provider ID.');
                }
            })
            .then((res) => {
                if (!res.ok) {
                    throw new Error(`Server responded with status: ${res.status} for bookings request`);
                }
                return res.json();
            })
            .then((data) => {
                setIsLoading(false);
                setBookings(data);
            })
            .catch((error) => {
                setIsLoading(false);
                console.error("Error fetching SP bookings:", error);
            });
        } else {
            setIsLoading(false);
            console.error("SPToken not found. Please log in.");
        }
    }, []);

    // Render the bookings
    return (
        <div>
            <h1>Your Bookings</h1>
            {isLoading ? (
                <p>Loading bookings...</p>
            ) : bookings.length > 0 ? (
                bookings.map((booking) => (
                    <div key={booking._id}>
                        <ul>
                            <li>Booking ID: {booking._id}</li>
                            {/* Make sure the rest of the properties are being correctly accessed */}
                            <li>Service Name: {booking.service && booking.service.serviceName}</li>
                            <li>User Name: {booking.userID && booking.userID.username}</li>
                            <li>User Email: {booking.userID && booking.userID.email}</li>
                            <li>Booking Date: {booking.bookingDate && new Date(booking.bookingDate).toLocaleDateString()}</li>
                        </ul>
                    </div>
                ))
            ) : (
                <p>No bookings found.</p>
            )}
        </div>
    );
};

export default SPBooking;
