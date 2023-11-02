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
	userID: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    serviceProviderID: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'ServiceProvider', 
        required: true
    },
    serviceIndex: {
		type: Number,
		required: true
	},
    bookingDate: {
        type: Date,
        default: Date.now
    },
});

const Booking = mongoose.model("Booking", bookingSchema);

module.exports = Booking;
