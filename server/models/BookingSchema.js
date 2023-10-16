const mongoose = require("mongoose");
const Schema = mongoose.Schema;
require("dotenv").config();

url = process.env.MONGODB_B_URI;

mongoose
	.connect(url, { useNewUrlParser: true, useUnifiedTopology: true })
	.then(() => {
		console.log("Connected to MongoDB");
	})
	.catch((error) => {
		console.log("Error connecting to MongoDB:", error.message);
	});

const bookingSchema = new Schema({
	orderId: { type: Schema.Types.ObjectId, ref: "Order" },
	userId: { type: Schema.Types.ObjectId, ref: "User" },
	serviceId: { type: Schema.Types.ObjectId, ref: "Service" },
	serviceProviderId: { type: Schema.Types.ObjectId, ref: "ServiceProvider" },
	date: { type: Date, required: true },
	bookingLocation: { type: String, required: true },
	bookingStatus: { type: String, required: true },
}); //hashing password

const Booking = mongoose.model("Booking", bookingSchema);

module.exports = Booking;
