const express = require("express");
const cors = require("cors");
const path = require("path");
const axios = require("axios");
const mongoose = require("mongoose");
const userRoutes = require("./routes/userRoutes");
const SPRoutes = require("./routes/serviceProviderRoutes");
const serviceProvider = require("./models/serviceProviderSchema");

require("dotenv").config();

const app = express();
const PORT = process.env.PORT || 3001;
app.use(express.json());
app.use(cors());
app.use(express.static(path.join(__dirname, "..", "build")));

// Routes
app.use("/auth", userRoutes);
app.use("/SPAuth", SPRoutes);

// The following endpoint can be requested by the frontend to get the Petfinder API access token
app.get("/api/petfinder/token", async (req, res) => {
	try {
		const response = await axios.post(
			"https://api.petfinder.com/v2/oauth2/token",
			`grant_type=client_credentials&client_id=${process.env.PETFINDER_CLIENT_ID}&client_secret=${process.env.PETFINDER_CLIENT_SECRET}`,
			{
				headers: {
					"Content-Type": "application/x-www-form-urlencoded",
				},
			}
		);

		res.json({ accessToken: response.data.access_token });
	} catch (error) {
		console.error("There was an error fetching the access token!", error);
		res.status(500).json({ error: "Failed to fetch access token" });
	}
});

app.get("/api/items", (req, res) => {});

app.get("/api/items/:id", (req, res) => {});

app.get("/api/services", async (req, res) => {
	try {
		const providers = await serviceProvider.find()
		const allServices = providers.map(provider => provider.servicesProvided).flat()
		res.json(allServices);
	}
	catch (error) {
		console.error("There was an error fetching the services!", error);
		res.status(500).json({ error: "Failed to fetch services" });
	}
});

app.get("/api/services/:id", async (req, res) => {
    const serviceId = req.params.id;

    try {
        const provider = await serviceProvider.findOne({ "servicesProvided._id": new mongoose.Types.ObjectId(serviceId) });
        if (!provider) {
            return res.status(404).json({ error: "Service not found" });
        }
        const service = provider.servicesProvided.id(serviceId);
        if (!service) {
            return res.status(404).json({ error: "Service not found" });
        }
    res.json(service);
    } catch (error) {
        console.error("Error fetching the service:", error.message);
        res.status(500).json({ error: "Failed to fetch service" });
    }
});


app.get("/api/users/:id", (req, res) => {});

app.get("*", (req, res) => {
	res.sendFile(path.join(__dirname, "..", "build", "index.html"));
});
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
