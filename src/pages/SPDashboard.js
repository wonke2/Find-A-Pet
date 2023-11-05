import React from "react";
import { Link } from "react-router-dom";
import "../styles/SPDashboard.css";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useSelector } from "react-redux";

import { faCalendarCheck, faList } from '@fortawesome/free-solid-svg-icons';


const SPDashboard = () => {
    const navigate = useNavigate();
    const SPToken = useSelector((state) => state.SPToken);


    useEffect(() => {
        if (!SPToken) {
            navigate("/splogin");
        }
    }, [SPToken, navigate]);


    return (
        <div className="sp-dashboard-container">
            <h1 className="user-dashboard-title">Service Provider Dashboard</h1>
            <div className="dashboard-tile-container">
                <Link to="/spdashboard/sp-services" className="dashboard-tile">
                    <FontAwesomeIcon icon={faList} size="2x" className="dashboard-tile-icon" />
                    <span>View Services</span>
                </Link>
                <Link to="/spdashboard/sp-bookings" className="dashboard-tile">
                    <FontAwesomeIcon icon={faCalendarCheck} size="2x" className="dashboard-tile-icon" />
                    <span>View Bookings</span>
                </Link>
            </div>
        </div>
    );
}

export default SPDashboard;
