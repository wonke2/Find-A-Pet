const express = require('express')
const router = express.Router()
const serviceProviderController = require('../controllers/serviceProviderController')
const bookingController = require("../controllers/bookingController"); 

const jwtUtils = require('../utils/jwtUtils')

router.post('/SPsignup', serviceProviderController.signUp)
router.post('/SPlogin', serviceProviderController.logIn)
router.get('/SPuser', jwtUtils.SPverifyToken, serviceProviderController.getServiceProvider)
router.get('/SP-bookings', jwtUtils.SPverifyToken, bookingController.getServiceProviderBookings); // To get bookings for a service provider

module.exports = router