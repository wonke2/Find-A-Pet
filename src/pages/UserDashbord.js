import React from "react";
import "../styles/UserDashbord.css";
import { useState, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useSelector } from "react-redux";

const UserDashboard = () => {
    const token = useSelector((state) => state.token);
    const navigate = useNavigate(); 

    useEffect(() => {
        // If no token is found, redirect to login
        if (!token) {
            navigate('/userlogin'); 
        }
    }, [token, navigate]); 

    return (
		<><div>
			<h1>Welcome to Your Dashboard</h1>
		</div><div>
				<Link to="/userbooking"> View Booking </Link>
			</div><div>
				<Link to="/wishlist">View Wishlist</Link>
			</div></>
    );
};

export default UserDashboard;
