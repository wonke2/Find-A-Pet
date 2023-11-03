import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom'; // Import useNavigate

const SPBooking = () => {
    const [bookings, setBookings] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const navigate = useNavigate(); // Instantiate useNavigate

    useEffect(() => {
        const SPToken = localStorage.getItem('SPToken');

        // Redirect to the login page if there's no token
        if (!SPToken) {
            navigate('/SPlogin'); // Navigate to login page
            return; // Return early to avoid making unnecessary fetch calls
        }

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
    }, [navigate]); // Add navigate to the dependency array

    const removeBooking = (bookingId) => {
        const SPToken = localStorage.getItem('SPToken');
        fetch(`/SPAuth/bookings/${bookingId}`, {
            method: 'DELETE',
            headers: {
                "Authorization": `Bearer ${SPToken}`,
                "Content-Type": "application/json",
            },
        })
        .then(res => res.json())
        .then(response => {
            if (response.status === 'success') {
                // Remove the deleted booking from the state to update the UI
                setBookings(bookings.filter(booking => booking._id !== bookingId));
                console.log('Booking removed successfully');
            } else {
                console.error('Failed to remove booking:', response.message);
            }
        })
        .catch(error => console.error('Error deleting booking:', error));
    };

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
                            <li>Service Name: {booking.service && booking.service.serviceName}</li>
                            <li>User Name: {booking.user && booking.user.username}</li>
                            <li>User Email: {booking.user && booking.user.email}</li>
                            <li>Booking Date: {booking.bookingDate && new Date(booking.bookingDate).toLocaleDateString()}</li>
                        </ul>
                        <button onClick={() => removeBooking(booking._id)}>Remove Booking</button>
                    </div>
                ))
            ) : (
                <p>No bookings found.</p>
            )}
        </div>
    );
};

export default SPBooking;
