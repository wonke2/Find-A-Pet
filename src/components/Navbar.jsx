import { Link } from "react-router-dom";
import { useState,useEffect } from "react";
import "./Navbar.css";
const Navbar = () => {
	const [token, setToken] = useState(null);
	const logout = () => {
		localStorage.removeItem("token");
		setToken(null);
	};
	useEffect(() => {
		setToken(localStorage.getItem("token"));
	}, [token]);
	return (
		<nav className="navbar">
			<Link to={"/"} className="logo">
				<h1>Find-a-Pet</h1>
			</Link>

			<ul className="nav-items">
				<li>
					<Link to="/petlistings" className="nav-element">
						Pet Listings
					</Link>
				</li>

				<li>
					<Link to="/userlogin" className="nav-element">
						User Login
					</Link>
				</li>

				<li>
					<Link to="/usersignup" className="nav-element">
						User Signup
					</Link>
				</li>
				<li>
					<Link to="/services" className="nav-element">
						Services
					</Link>
				</li>
				{token ? (
					<li>
						<p className="nav-element" onClick={logout}>
							Logout
						</p>
					</li>
				) : null}
			</ul>
		</nav>
	);
};

export default Navbar;
