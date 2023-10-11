import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const UserProfile = () => {
	const [loading, setLoading] = useState(true);
	const [user, setUser] = useState(null);
	const navigate = useNavigate();
	useEffect(() => {
		const token = localStorage.getItem("token");
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
	}, [navigate]);
    console.log(user);
	return loading ? (
		<h1>Loading...</h1>
	) : (
		<div>
			<h1>User Profile</h1>
            <h2>User Id: {user._id}</h2>
            <h2>Username: {user.username}</h2>
            <h2>Email: {user.email}</h2>
            <h2>Phone No: {user.phoneNo}</h2>
            <h2>Address: {user.address}</h2>
		</div>
	);
};

export default UserProfile;
