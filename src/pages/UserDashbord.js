import React from "react";
import "../styles/UserDashboard.css";
import { useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useSelector } from "react-redux";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHotel, faHeart } from '@fortawesome/free-solid-svg-icons';

const UserDashboard = () => {
    // Get the authentication token from the Redux store.
    const token = useSelector((state) => state.token);
    // Create a navigate function to handle routing.
    const navigate = useNavigate();

    useEffect(() => {
        // If no token is found, redirect to the user login page.
        if (!token) {
            navigate('/userlogin');
        }
    }, [token, navigate]);

    return (
        <div className="user-dashboard-container">
            <div>
                <h1 className="user-dashboard-title">Welcome to Your Dashboard</h1>
            </div>
            <div className="dashboard-tile-container">
                {/* Link to the user's booking page */}
                <Link to="/userbooking" className="dashboard-tile">
                    <FontAwesomeIcon icon={faHotel} className="dashboard-tile-icon" />
                    <span>View Booking</span>
                </Link>
                {/* Link to the user's wishlist page */}
                <Link to="/wishlist" className="dashboard-tile">
                    <FontAwesomeIcon icon={faHeart} className="dashboard-tile-icon" />
                    <span>View Wishlist</span>
                </Link>
            </div>
        </div>
    );
};

export default UserDashboard;
