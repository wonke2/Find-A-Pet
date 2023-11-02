import { Link, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { setLogout } from "../state/authSlice";
import "./Navbar.css";
const Navbar = () => {
	const navigate = useNavigate();
	const dispatch = useDispatch();
	const token = useSelector((state) => state.token);
	const SPToken = useSelector((state) => state.SPToken)
	
	const logout = () => {
		dispatch(setLogout());
		navigate("/");
	};

	return (
		<nav className="navbar">
			<Link to="/" className="logo">
				<h1>Find-a-Pet</h1>
			</Link>
				
			

			<ul className="nav-items">
				<li>
					<Link to="/petlistings" className="nav-element">
						Pet Listings
					</Link>
				</li>
				{/* Show "Login" and "Register" links only when no tokens are present */}
				{!token && !SPToken && (
					<>
						<li>
							<Link to="/userlogin" className="nav-element">
								Login
							</Link>
						</li>
						<li>
							<Link to="/usersignup" className="nav-element">
								Register
							</Link>
						</li>
					</>
				)}
				{/* Show "Dashboard" link when an SPToken is present */}
				{SPToken && (
					<li>
						<Link to="/spdashboard" className="nav-element">
							Dashboard
						</Link>
					</li>
				)}

				<li>
					<Link to="/services" className="nav-element">
						Services
					</Link>
				</li>
				{/* Show "Profile" and "Logout" links when a token is present */}
				{token && (
					<>
						<li>
							<Link to="/user" className="nav-element">
								Profile
							</Link>
						</li>
						<li>
							<Link to={"/userdashbord"} className="nav-element">
								Dashboard
							</Link>
						</li>
						<li>
							<Link className="nav-element" onClick={logout}>
								Logout
							</Link>
						</li>
					</>
				)}
			</ul>
		</nav>
	);
};

export default Navbar;
