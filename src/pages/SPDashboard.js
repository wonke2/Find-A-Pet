import React from "react"
import "../styles/SPDash.css"
import { useState, useEffect } from "react"
import { useNavigate } from "react-router-dom"
import { useDispatch } from 'react-redux'
import { setLogout } from '../state/authSlice'

const SPDashboard = () => {
    const navigate = useNavigate()
    const [bookings, setBookings] = useState([])
    const [services, servicesProvided] = useState([]) 
    const [SPToken, setSPToken] = useState(localStorage.getItem("SPToken"))
    const [loading, setLoading] = useState(true)
    const dispatch = useDispatch()

    useEffect(() => {
        if (!SPToken) {
            navigate("/splogin")
        } else {
            const fetchBookings = async () => {
                try {
                    const response = await fetch(`/bookings`, {
                        method: 'GET',
                        headers: {
                            'Authorization': `Bearer ${SPToken}`
                        }
                    })
                    const data = await response.json()
                    setBookings(data)
                    setLoading(false)
                } catch (error) {
                    console.error("Error fetching bookings:", error)
                    setLoading(false)
                }
            }

            fetchBookings()
        }
    }, [SPToken, navigate])
     const handleLogout = () => {
        dispatch(setLogout());
        navigate('/splogin');
    }
    return (
        <div>
            <h1>Service Provider Dashboard</h1>
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
