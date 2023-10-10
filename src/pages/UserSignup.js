import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../styles/UserSignup.css";
const UserSignup = () => {
	const [username, setUsername] = useState("");
	const [password, setPassword] = useState("");
	const [email, setEmail] = useState("");
	const [phoneNo, setPhoneNo] = useState("");
	const [address, setAddress] = useState("");
	const navigate = useNavigate();
	const login = async () => {
		const res = await fetch("http://localhost:3001/auth/signup", {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
			},
			body: JSON.stringify({
				username,
				password,
				email,
				phoneNo,
				address,
			}),
		});
		const data = await res.json();
		if (data.status === "fail") {
			alert(data.message);
		} else {
			alert("User Created");
			navigate("/userlogin");
		}
	};
	return (
		<div className="main_form_signup">
			<h1>User Signup</h1>
			<div className="form_inp">
				<input
					type="text"
					placeholder="Username"
					onChange={(e) => {
						setUsername(e.target.value);
					}}
				/>
				<input
					type="password"
					placeholder="Password"
					onChange={(e) => {
						setPassword(e.target.value);
					}}
				/>
				<textarea
					name=""
					id=""
					rows="3"
					placeholder="Address"
					onChange={(e) => {
						setAddress(e.target.value);
					}}
				/>
				<input
					type="email"
					placeholder="email"
					onChange={(e) => {
						setEmail(e.target.value);
					}}
				/>
				<input
					type="number"
					placeholder="phoneNo"
					onChange={(e) => {
						setPhoneNo(e.target.value);
					}}
				/>
				<button className="login_button" onClick={login}>
					Signup
				</button>
			</div>
		</div>
	);
};

export default UserSignup;
