const Booking = require('../models/BookingSchema');

// Create a booking
exports.createBooking = async (req, res) => {
    try {
        const { userID, serviceProviderID, serviceIndex } = req.body;
        
        const booking = await Booking.create({
            userID, 
            serviceProviderID, 
            serviceIndex
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

        const bookings = await Booking.find({ userID })
            .populate('serviceProviderID', 'servicesProvided serviceProviderName');

        const populatedBookings = bookings.map(booking => {
            const service = booking.serviceProviderID.servicesProvided[booking.serviceIndex];
            return {
                ...booking._doc,
                service,
                serviceProviderName: booking.serviceProviderID.serviceProviderName
            };
        });

        res.status(200).json(populatedBookings);
    } catch (error) {
        console.error("Error in getUserBookings:", error);
        res.status(500).json({ error: error.message });
    }
};

// Get bookings for service provider
exports.getServiceProviderBookings = async (req, res) => {
    try {
        const { serviceProviderID } = req.params;

        const bookings = await Booking.find({ serviceProviderID })
            .populate('userID', 'username email')
            .populate('serviceProviderID', 'servicesProvided'); // Populate only serviceProviderID.

        // Now, use serviceIndex to get the service from the populated serviceProviderID.
        const modifiedBookings = bookings.map(booking => {
            const service = booking.serviceProviderID.servicesProvided[booking.serviceIndex];
            return {
                ...booking.toObject(), // Use toObject() to convert the mongoose document into a plain object.
                service, // Add the service information.
                userName: booking.userID.userName, // Add user's name.
                userEmail: booking.userID.userEmail // Add user's email.
            };
        });

        res.status(200).json(modifiedBookings);
    } catch (error) {
        console.error("Error in getServiceProviderBookings:", error);
        res.status(500).json({ error: error.message });
    }
};


