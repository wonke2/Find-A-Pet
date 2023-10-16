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

const orderSchema = new Schema({
	userId: { type: Schema.Types.ObjectId, ref: "User" },
	serviceId: { type: Schema.Types.ObjectId, ref: "Service" },
	serviceProviderId: { type: Schema.Types.ObjectId, ref: "ServiceProvider" },
	orderStatus: { type: String, required: true },
    orderETA: { type: String, required: true },
    orderSubtotal: { type: Number, required: true },
}); //hashing password

const Order = mongoose.model("Booking", bookingSchema);

module.exports =Order;
