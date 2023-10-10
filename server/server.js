const express = require("express");
const cors = require("cors");
const path = require("path");
const axios = require("axios");
const mongoose = require("mongoose");
const userRoutes = require("./routes/userRoutes");

require("dotenv").config();

const app = express();
const PORT = process.env.PORT || 3001;

app.use(cors());
app.use(express.static(path.join(__dirname, "..", "static")));

// Routes
app.use(userRoutes);

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

app.get("/api/services", (req, res) => {});

app.get("/api/services/:id", (req, res) => {});

app.get("/api/users/:id", (req, res) => {});

app.get("*", (req, res) => {
	res.sendFile(path.join(__dirname, "..", "build", "index.html"));
});
mongoose
	.connect(process.env.MONGO_URL)
	.then(() => {
		app.listen(PORT, () => {
			console.log(`Server is running on port ${PORT}`);
		});
	})
	.catch((err) => {
		console.log(err);
	});
