const Booking = require("../models/BookingSchema");
const User = require("../models/UserSchema");
const Service = require("../models/ServiceSchema");
const ServiceProvider = require("../models/ServiceProviderSchema");

exports.createBooking = async (req, res) => {
	try {
		const {
			userId,
			serviceId,
			serviceProviderId,
			date,
			bookingLocation,
			bookingStatus,
		} = req.body;
		const booking = await Booking.create({
			userId,
			serviceId,
			serviceProviderId,
			date,
			bookingLocation,
			bookingStatus,
		});
		res.status(201).json({ status: "success", booking });
	} catch (error) {
		res.status(500).json({ status: "fail", error: error.message });
	}
};

exports.getBookingByUserId = async (req, res) => {
	try {
		const { userId } = req.params;
		const booking = await Booking.find({ userId });
		if (booking.length === 0) {
			return res
				.status(404)
				.json({ status: "fail", message: "No bookings found" });
		}
		res.status(200).json({ status: "success", booking });
	} catch (error) {
		res.status(500).json({ status: "fail", error: error.message });
	}
};
