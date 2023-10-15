import { Link } from "react-router-dom";
import "./Navbar.css";
const Navbar = () => {
	const token = localStorage.getItem("token");
	const logout = () => {
		localStorage.setItem("token", null);
	};
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
			</ul>
		</nav>
	);
};

export default Navbar;
