import React, { useState, useEffect } from "react";
import axios from "axios";
import { BrowserRouter as Router, Route, Routes, Link } from "react-router-dom";
import PetListings from "./pages/PetListings";
import PetDetails from "./pages/PetDetails";
import UserLogin from "./pages/UserLogin";
import UserSignup from "./pages/UserSignup";
import SPLogin from "./pages/SPLogin";
import SPSignup from "./pages/SPSignup";
import "./styles/App.css";
import UserProfile from "./pages/UserProfile";
import Navbar from "./components/Navbar";
import ServiceListings from "./pages/ServiceListings";

function App() {
	const Home = () => {
		return (
			<div className="App">
				<h2>Welcome to Find-a-Pet!</h2>
			</div>
		);
	};

	return (
		<div className="App">
			<Router>
				<Navbar />
				<Routes>
					<Route path="/" element={<Home />} />
					<Route path="/petlistings" element={<PetListings />} />
					<Route path="/pet/:id" element={<PetDetails />} />
					<Route path="/userlogin" element={<UserLogin />} />
					<Route path="/usersignup" element={<UserSignup />} />
					<Route path="/splogin" element={<SPLogin />} />
					<Route path="/spsignup" element={<SPSignup />} />
					<Route path="/user" element={<UserProfile />} />
					<Route path="/services" element={<ServiceListings />} />
					<Route path="*" element={<Home />} />
				</Routes>
			</Router>
		</div>
	);
}

export default App;
