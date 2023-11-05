const express = require("express");
const cors = require("cors");
const path = require("path");
const axios = require("axios");
const mongoose = require("mongoose");
const userRoutes = require("./routes/userRoutes");
const SPRoutes = require("./routes/serviceProviderRoutes");
const serviceProvider = require("./models/serviceProviderSchema");
const serviceProvidersController = require("./controllers/serviceProviderController");
const Booking = require("./models/BookingSchema");

require("dotenv").config();

const app = express();
const PORT = process.env.PORT || 3001;
app.use(express.json());
app.use(cors());
app.use(express.static(path.join(__dirname, "..", "build")));

// Routes
app.use("/auth", userRoutes);
app.use("/SPAuth", SPRoutes);

// Get Petfinder API access token
app.get("/api/petfinder/token", async (req, res) => {
	try {
		const response = await axios.post(
			"https://api.petfinder.com/v2/oauth2/token",
			`grant_type=client_credentials&client_id=${process.env.PETFINDER_CLIENT_ID}&client_secret=${process.env.PETFINDER_CLIENT_SECRET}`, {
				headers: {
					"Content-Type": "application/x-www-form-urlencoded",
				},
			}
		);

		res.json({
			accessToken: response.data.access_token
		});
	} catch (error) {
		console.error("There was an error fetching the access token!", error);
		res.status(500).json({
			error: "Failed to fetch access token"
		});
	}
});

// Additional API endpoints for items and services
app.get("/api/items", (req, res) => {});

app.get("/api/items/:id", (req, res) => {});

// Get all services
app.get("/api/services", async (req, res) => {
	try {
		const providers = await serviceProvider.find()
		const allServices = providers.map(provider => provider.servicesProvided).flat()
		res.json(allServices);
	} catch (error) {
		console.error("There was an error fetching the services!", error);
		res.status(500).json({
			error: "Failed to fetch services"
		});
	}
});

// Get a specific service by ID
app.get("/api/services/:id", async (req, res) => {
	const serviceId = req.params.id;
	try {
		const provider = await serviceProvider.findOne({
			"servicesProvided._id": new mongoose.Types.ObjectId(serviceId)
		});
		if (!provider) {
			return res.status(404).json({
				error: "Service not found"
			});
		}
		const service = provider.servicesProvided.id(serviceId);
		if (!service) {
			return res.status(404).json({
				error: "Service not found"
			});
		}
		res.json(service);
	} catch (error) {
		console.error("Error fetching the service:", error.message);
		res.status(500).json({
			error: "Failed to fetch service"
		});
	}
});

// Get bookings for a specific service provider by ID
app.get("/api/bookings/:spID", async (req, res) => {
	try {
		const bookings = await Booking.find({
			serviceProviderId: req.params.spId
		});
		res.json(bookings);
	} catch (error) {
		res.status(500).json({
			error: error.message
		});
	}
});

// Get all service providers
app.get("/api/serviceProviders", async (req, res) => {
	try {
		const providers = await serviceProvider.find()
		res.json(providers);
	} catch (error) {
		console.error("There was an error fetching the service providers!", error);
		res.status(500).json({
			error: "Failed to fetch service providers"
		});
	}
});

// Get a specific service provider by ID
app.get("/api/serviceProviders/:id", serviceProvidersController.getServiceProvider);

// Placeholder for user routes (you can add implementation here)
app.get("/api/users/:id", (req, res) => {});

// Serve the React app for any other routes
app.get("*", (req, res) => {
	res.sendFile(path.join(__dirname, "..", "build", "index.html"));
});

// Connect to MongoDB and start the server
mongoose
	.connect(process.env.MONGODB_U_URI)
	.then(() => {
		app.listen(PORT, () => {
			console.log(`Server is running on port ${PORT}`);
		});
	})
	.catch((err) => {
		console.log(err);
	});
