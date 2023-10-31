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
		<div className="center">
			<form >
				<h3>Login Here</h3>

				<label>Username</label>
				<input
					type="text"
					placeholder="username"
					id="username"
					onChange={(event) => {
						setUsername(event.target.value);
					}}
				/>

				<label>Password</label>
				<input
					type="password"
					placeholder="Password"
					id="password"
					onChange={(event) => {
						setPassword(event.target.value);
					}}
				/>

				<div className="button" onClick={login}>Log In</div>
				<div className="social">
					<Link to="/usersignup">Signup</Link>
					<Link to="/splogin">Service Provider</Link>
				</div>
			</form>
		</div>
	);
};

export default UserLogin;
