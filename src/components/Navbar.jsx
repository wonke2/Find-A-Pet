import { Link, useNavigate } from "react-router-dom";
import {useSelector,useDispatch} from "react-redux";
import { setLogout } from "../state/authSlice";
import "./Navbar.css";
const Navbar = () => {
	const navigate = useNavigate();
	const dispatch = useDispatch();
	const token = useSelector((state) => state.token);
	const logout = () => {
		dispatch(setLogout());
		navigate("/");
	};

	return (
		<nav className="navbar">
			<Link to={"/userdashbord"} className="logo">
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
						<Link to="/user" className="nav-element">Profile</Link>
					</li>
				) : null}
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
