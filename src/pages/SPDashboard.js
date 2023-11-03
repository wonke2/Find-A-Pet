import React from "react";
import { Link } from "react-router-dom";
import "../styles/SPDash.css";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch } from 'react-redux';
import { setLogout } from '../state/authSlice';

const SPDashboard = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const [SPToken, setSPToken] = useState(localStorage.getItem("SPToken"));
    const [serviceProvider, setServiceProvider] = useState(null);

    useEffect(() => {
        if (!SPToken) {
            navigate("/splogin");
        }
    }, [SPToken, navigate]);

    const handleLogout = () => {
        dispatch(setLogout());
        navigate('/splogin');
    }

    return (
        <div>
            <h1>Service Provider Dashboard</h1>
            <Link to="/spdashboard/sp-services">View Services</Link>
            <Link to="/spdashboard/sp-bookings">View Bookings</Link> {/* Link to the SPBookings component */}
            <button onClick={handleLogout}>Logout</button>
        </div>
    );
}

export default SPDashboard;
