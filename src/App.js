import React, { useState, useEffect } from "react";
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
import UserDashbord from "./pages/UserDashbord";
import WishList from "./pages/WishList";
import DetailedServiceListing from "./pages/detailedServiceListing";
import SPDashboard from "./pages/SPDashboard";
import UserBooking from './pages/UserBooking';
import SPBooking from './pages/SPBooking';
import AddService from "./pages/AddService";
import ServiceProviderServices from "./pages/serviceProviderServices";
import SPProfile from "./pages/SPProfile";
import { Provider } from 'react-redux'
import { store, persistor } from './state/store'
import { PersistGate } from 'redux-persist/integration/react'

function App() {
	const Home = () => {
		return (
			<div className="App">
				<h2>Welcome to Find-a-Pet!</h2>
			</div>
		);
	};

	return (
		<Provider store={store}>
        	<PersistGate loading={null} persistor={persistor}>
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
							<Route path="/serviceprovider" element={<SPProfile />} />
							<Route path="/services/:serviceID" element={<DetailedServiceListing />} />
							<Route path="/services" element={<ServiceListings />} />
							<Route path="/userdashbord" element={<UserDashbord />} />
							<Route path="/wishlist" element={<WishList />} />
							<Route path="/userbooking" element={<UserBooking />} />
							<Route path="/spdashboard/sp-services/addservice" element={<AddService />} />
							<Route path="/spdashboard/sp-services" element={<ServiceProviderServices />} />
							<Route path="/spdashboard" element={<SPDashboard />} />
							<Route path="/spdashboard/sp-bookings" element={<SPBooking />} />
							<Route path="*" element={<Home />} />
						</Routes>
					</Router>
				</div>
			</PersistGate>
		</Provider>
	);
}

export default App;
