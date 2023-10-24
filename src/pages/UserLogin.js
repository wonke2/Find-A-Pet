import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { setLogin } from "../state/authSlice";
import { useDispatch } from "react-redux";
import "../styles/UserLogin.css";
const UserLogin = () => {
	const [username, setUsername] = useState("");
	const [password, setPassword] = useState("");
	const navigate = useNavigate();
	const dispatch = useDispatch();
	const login = async () => {
		const res = await fetch("http://localhost:3000/auth/login", {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
			},
			body: JSON.stringify({ username, password }),
		});
		const data = await res.json();
		if (data.status === "fail") {
			alert(data.message);
		} else {
			dispatch(setLogin({ token: data.token }));
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
				<Link to="/splogin" className="nav-element">
					Service Provider Login
				</Link>
			</div>
		</div>
	);
};

export default UserLogin;
