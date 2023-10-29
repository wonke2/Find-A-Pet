import React from "react";
import "../styles/UserDashbord.css";
import { useState, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useSelector } from "react-redux";

const UserDashbord = () => {
	const navigate = useNavigate();
	const [bookings, setBookings] = useState([]);
	const token = useSelector((state) => state.token);
	const [loading, setLoading] = useState(true);
	useEffect(() => {
		if (!token) {
			navigate("/userlogin");
		} else {
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
								<h3>{booking.orderId}</h3>
								<h3>{booking.serviceId}</h3>
								<h3>{booking.serviceProviderId}</h3>
								<h3>{booking.date}</h3>
								<h3>{booking.bookingLocation}</h3>
								<h3>{booking.bookingStatus}</h3>
							</div>
						</div>
					);
				})
			)}
			<div className="card">
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
					<h3>Test Card</h3>
					<h3>Test</h3>
					<h3>Test</h3>
					<h3>Test</h3>
					<h3>Test</h3>
					<h3>Test</h3>
				</div>
			</div>
			<div>
				<Link to="/wishlist">View Wishlist</Link>
			</div>
		</div>
	);
};

export default UserDashbord;
