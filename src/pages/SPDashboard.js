import React from "react"
import "../styles/SPDash.css"
import { useState, useEffect } from "react"
import { useNavigate } from "react-router-dom"

const SPDashboard = () => {
    const navigate = useNavigate()
    const [bookings, setBookings] = useState([])
    const [services, servicesProvided] = useState([]) 
    const [SPtoken, setSPToken] = useState(localStorage.getItem("token"))
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        if (!SPtoken) {
            navigate("/splogin")
        } else {
            const fetchBookings = async () => {
                try {
                    const response = await fetch(`/bookings`, {
                        method: 'GET',
                        headers: {
                            'Authorization': `Bearer ${SPtoken}`
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
    }, [SPtoken, navigate])
    return (
        <div>
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
        </div>
    );
}

export default SPDashboard;
