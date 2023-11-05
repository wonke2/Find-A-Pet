import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import "../styles/Profile.css";

const UserProfile = () => {
	const token = useSelector((state) => state.token);
	const [loading, setLoading] = useState(true);
	const [user, setUser] = useState(null);
	const navigate = useNavigate();

	useEffect(() => {
		if (!token) {
			navigate("/userlogin");
		} else {
			fetch("http://localhost:3000/auth/user", {
				headers: {
					Authorization: `Bearer ${token}`,
				},
			})
				.then((res) => res.json())
				.then((data) => {
					if (data.status === "fail") {
						navigate("/userlogin");
					} else {
						setUser(data.data);
						setLoading(false);
					}
				});
		}
	}, [token]);
	console.log(user);
	return (
		<div className="profile-container">
			<Link to="/userdashboard" className="dashboard-link">Dashboard</Link>
			{loading ? (
				<div>
					<h1 className='profile-title'>User Profile</h1>
					<p className="loading-message">Loading...</p>
				</div>
			) : (
				<>
					<h1 className='profile-title'>Welcome Back {user.username}!</h1>
					<h3 className="profile-label">Your Details: </h3>
					<div className="profile-details">
						<ul>
							<li><strong>Email: </strong><div className="detail">{user.email}</div></li>
							<li><strong>Phone No: </strong><div className="detail">{user.phoneNo}</div></li>
							<li><strong>Address: </strong><div className="detail">{user.address}</div></li>
						</ul>
						<p className="profile-id"><strong>User ID </strong><br /><i>{user._id}</i></p>
					</div>
				</>
			)};
		</div>
	);
};

export default UserProfile;
