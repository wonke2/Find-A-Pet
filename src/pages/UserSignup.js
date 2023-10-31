import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import validator from "validator";

const UserSignup = () => {
	const [username, setUsername] = useState("");
	const [password, setPassword] = useState("");
	const [email, setEmail] = useState("");
	const [phoneNo, setPhoneNo] = useState("");
	const [address, setAddress] = useState("");
	const [err, setErr] = useState("");
	const [pherr, setPherr] = useState(null);
	const [emailerr, setEmailerr] = useState("");
	const [usererr, setUsererr] = useState("");
	const navigate = useNavigate();
	const checkPassword = (event) => {
		var pass = event.target.value;
		const reg = new RegExp(
			"^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*])(?=.{8,})"
		);
		if (pass) {
			var test = reg.test(pass);
			if (test) {
				setPassword(pass);
			} else {
				setPassword("");
				setErr(
					"Password must contain 8 characters, 1 uppercase, 1 lowercase, 1 number and 1 special character"
				);
			}
		} else {
			setPassword("");
			setErr("Password cannot be empty");
		}
	};
	const checkPhone = (event) => {
		var phoneNo = event.target.value;

		if (phoneNo) {
			if (phoneNo.length === 10) {
				setPhoneNo(phoneNo);
			} else {
				setPhoneNo("");
				setPherr("Phone number must be 10 digits");
			}
		} else {
			setPhoneNo("");
			setPherr("Phone number cannot be empty");
		}
	};
	const checkUsername = (event) => {
		const username = event.target.value;
		if (username) {
			setUsername(username);
		} else {
			setUsername("");
			setUsererr("Username cannot be empty");
		}
	};
	const checkEmail = (event) => {
		var email = event.target.value;
		if (email) {
			var test = validator.isEmail(email);
			if (test) {
				setEmail(email);
			} else {
				setEmailerr("Invalid Email");
			}
		} else {
			setEmail("");
			setEmailerr("Email cannot be empty");
		}
	};
	const signup = async () => {
		if (!username || !password || !email || !phoneNo) {
			alert("Please fill all the required fields");
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
	console.log(phoneNo);
	return (
		<div className="center">
			<form>
				<h3>Register</h3>

				<label>
					Username <i>*</i>
				</label>
				<input
					type="text"
					placeholder="username"
					id="username"
					onChange={checkUsername}
				/>
				<p className={`err ${username ? "hidden" : ""}`}>{usererr}</p>
				<label>
					Password <i>*</i>
				</label>
				<input
					type="password"
					placeholder="Password"
					id="password"
					onChange={checkPassword}
				/>
				<p className={`err ${password ? "hidden" : ""}`}>{err}</p>
				<label>Address</label>
				<textarea
					name="address"
					id=""
					cols="30"
					rows="10"
					placeholder="Address"
					onChange={(event) => {
						setAddress(event.target.value);
					}}></textarea>
				<label>
					Email <i>*</i>
				</label>
				<input
					type="email"
					placeholder="Email"
					id="email"
					onChange={checkEmail}
				/>
				<p className={`err ${email ? "hidden" : ""}`}>{emailerr}</p>
				<label>
					Phone Number <i>*</i>
				</label>
				<input
					type="text"
					placeholder="Phone Number"
					onChange={checkPhone}
				/>
				<p className={`err ${phoneNo ? "hidden" : ""}`}>{pherr}</p>
				<div className="button" onClick={signup}>Signup</div>
				<div className="social">
					<Link to="/userlogin"> Login </Link>
					<Link className="/spsignup"> Service Provider</Link>
				</div>
			</form>
		</div>
	);
};

export default UserSignup;
