import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import validator from "validator";
import "../styles/UserSignup.css";
import { set } from "mongoose";
const UserSignup = () => {
	const [username, setUsername] = useState("");
	const [password, setPassword] = useState("");
	const [email, setEmail] = useState("");
	const [phoneNo, setPhoneNo] = useState("");
	const [address, setAddress] = useState("");
	const [err, setErr] = useState("");
	const navigate = useNavigate();
	const checkPassword = (event) => {
		var pass = event.target.value;
		const reg = new RegExp(
			"^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*])(?=.{8,})"
		);
		var test = reg.test(pass);
		if (test) {
			setErr("");
			console.log(pass);
			setPassword(pass);
		} else {
			setErr(
				"Password must contain 8 characters, 1 uppercase, 1 lowercase"
			);
		}
	};
	const signup = async () => {
		if (!username || !password || !email || !phoneNo) {
			alert("Please fill all the required fields");
			return;
		}
		const validPhoneNo = validator.isMobilePhone(phoneNo);
		const validEmail = validator.isEmail(email);
		if (!validPhoneNo) {
			alert("Invalid Phone Number");
			return;
		}
		if (!validEmail) {
			alert("Invalid Email");
			return;
		}
		const res = await fetch("http://localhost:3000/auth/signup", {
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
					className="required"
					type="text"
					placeholder="Username"
					onChange={(e) => {
						setUsername(e.target.value);
					}}
				/>
				<p>{err}</p>
				<input
					className="required"
					type="password"
					placeholder="Password"
					onChange={checkPassword}
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
					className="required"
					type="email"
					placeholder="email"
					onChange={(e) => {
						setEmail(e.target.value);
					}}
				/>
				<input
					className="required"
					type="number"
					placeholder="phoneNo"
					onChange={(e) => {
						setPhoneNo(e.target.value);
					}}
				/>
				<button className="login_button" onClick={signup}>
					Signup
				</button>
				<Link to="/spsignup" className="nav-element">
					Service Provider Signup
				</Link>
			</div>
		</div>
	);
};

export default UserSignup;
