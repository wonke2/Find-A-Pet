import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../styles/UserLogin.css";
const UserLogin = () => {
	const [username, setUsername] = useState("");
	const [password, setPassword] = useState("");
	const navigate = useNavigate();
	const login = async () => {
		const res = await fetch("http://localhost:3001/auth/login", {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
			},
			body: JSON.stringify({ username, password }),
		});
		const data = await res.json();
		if (data.status === "fail") {
			alert();
		} else {
			localStorage.setItem("token", data.token);
			navigate("/user");
		}
	};
	return (
		<div className="main_form">
			<h1>User Login</h1>
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
				<button className="login_button" onClick={login}>
					Login
				</button>
			</div>
		</div>
	);
};

export default UserLogin;
