import { Link, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { setLogout } from "../state/authSlice";
import "./Navbar.css";
import {GiDogHouse} from 'react-icons/gi'
const Navbar = () => {
	const navigate = useNavigate();
	const dispatch = useDispatch();
	const token = useSelector((state) => state.token);
	const SPToken = useSelector((state) => state.SPToken);

	const logout = () => {
		dispatch(setLogout());
		navigate("/");
		window.location.reload();
	};

	return (
		<nav>
			<Link to="/home">
				<GiDogHouse className="logo" />
			</Link>

			<div>
				<Link to="/petlistings" className="btn">
					Pet Listings
				</Link>
				<Link to="/services" className="btn">
					Services
				</Link>
				{!token && !SPToken && (
					<Link to="/userlogin" className="btn">
						Login
					</Link>
				)}
				{!token && !SPToken && (
					<Link to="/usersignup" className="btn">
						Register
					</Link>
				)}{" "}
				{SPToken && (
					<Link to="/serviceprovider" className="btn">
						Profile
					</Link>
				)}
				{SPToken && (
					<Link to="/spdashboard" className="btn">
						Dashboard
					</Link>
				)}
				{SPToken && (
					<Link className="btn" onClick={logout}>
						Logout
					</Link>
				)}
				{token && (
					<Link to={"/userdashboard"} className="btn">
						Dashboard
					</Link>
				)}
				{token && (
					<Link to="/user" className="btn">
						Profile
					</Link>
				)}
				{token && (
					<Link className="btn" onClick={logout}>
						Logout
					</Link>
				)}
			</div>
		</nav>
	);
};

export default Navbar;
