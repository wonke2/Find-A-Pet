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
                    // The backend will decode the token and fetch bookings accordingly
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
                        {/* Display booking details here */}
                    </div>
                ))}
            </div>
            )}
        </div>
    );
}

export default SPDashboard;
