import React from "react";
import "../styles/UserDashbord.css";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

const UserDashbord = () => {
	const navigate = useNavigate();
	const [bookings, setBookings] = useState([]);
	const [token, setToken] = useState(localStorage.getItem("token"));
	const [loading, setLoading] = useState(true);
	useEffect(() => {
		if (!token) {
			navigate("/userlogin");
		} else {
			setToken(localStorage.getItem("token"));
			fetch("http://localhost:3000/auth/booking", {
				headers: {
					Authorization: `Bearer ${token}`,
				},
			})
				.then((res) => res.json())
				.then((data) => {
					if (data.status === "fail") {
						alert(data.message);
						setLoading(false);
					} else {
						setBookings(data.booking);
						setLoading(false);
					}
				});
		}
	}, []);

	return (
		<div className="min-h-screen">
			<h1 className="text-3xl text-center">User Dashbord</h1>
			{loading ? (
				<h1>Loading...</h1>
			) : bookings.length === 0 ? (
				<h1>No bookings found</h1>
			) : (
				bookings.map((booking, idx) => {
					return (
						<div className="card" key={idx}>
							<div className="card-itm">
								<h3>Order Id</h3>
								<h3>Service Id</h3>
								<h3>Service Provider Id</h3>
								<h3>Date</h3>
								<h3>Booking Location</h3>
								<h3>Booking Status</h3>
							</div>
							<div className="card-itm">
								<h3>:</h3>
								<h3>:</h3>
								<h3>:</h3>
								<h3>:</h3>
								<h3>:</h3>
								<h3>:</h3>
							</div>
							<div className="card-itm">
								<h3>Order Id</h3>
								<h3>Service Id</h3>
								<h3>Service Provider Id</h3>
								<h3>Date</h3>
								<h3>Booking Location</h3>
								<h3>Booking Status</h3>
							</div>
						</div>
					);
				})
			)}
		</div>
	);
};

export default UserDashbord;
