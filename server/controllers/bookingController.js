const Booking = require('../models/BookingSchema');

// Create a booking
exports.createBooking = async (req, res) => {
    try {
        const { userID, serviceProviderID, serviceID } = req.body;
        
        const booking = await Booking.create({
			userID, 
			serviceProviderID, 
			serviceID 
		});
		res.status(201).json({ status: "success", booking });
	} catch (error) {
		res.status(500).json({ status: "fail", error: error.message });
	}
};

// Get bookings for user
exports.getUserBookings = async (req, res) => {
    try {
        const { userID } = req.params;

        const bookings = await Booking.find({ userID }).populate('serviceID', 'serviceName').populate('serviceProviderID', 'serviceProviderName');

        res.status(200).json(bookings);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Get bookings for service provider
exports.getServiceProviderBookings = async (req, res) => {
    try {
        const { serviceProviderID } = req.params;

        const bookings = await Booking.find({ serviceProviderID }).populate('serviceID', 'serviceName').populate('userID', 'userName');

        res.status(200).json(bookings);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};
