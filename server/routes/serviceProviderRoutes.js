const express = require('express')
const router = express.Router()
const serviceProviderController = require('../controllers/serviceProviderController')
const bookingController = require("../controllers/bookingController"); 

const jwtUtils = require('../utils/jwtUtils')

router.post('/SPsignup', serviceProviderController.signUp)
router.post('/SPlogin', serviceProviderController.logIn)
router.get('/SPuser', jwtUtils.SPverifyToken, serviceProviderController.getServiceProvider)
router.delete('/bookings/:bookingId', jwtUtils.SPverifyToken, bookingController.deleteBooking);
router.get('/bookings/service-provider/:serviceProviderID', jwtUtils.SPverifyToken, bookingController.getServiceProviderBookings); 
router.post('/addservice', jwtUtils.SPverifyToken, serviceProviderController.addService);
router.get('/services', jwtUtils.SPverifyToken, serviceProviderController.getServices);
router.delete('/services/:serviceId', jwtUtils.SPverifyToken, serviceProviderController.deleteService);

module.exports = router