const express = require('express')
const router = express.Router()
const serviceProviderController = require('../controllers/serviceProviderController')
const jwtUtils = require('../utils/jwtUtils')

router.post('/SPsignup', serviceProviderController.signUp)
router.post('/SPlogin', serviceProviderController.logIn)
router.get('/SPuser', jwtUtils.SPverifyToken, serviceProviderController.getServiceProvider)
router.post("/addservice", jwtUtils.SPverifyToken, serviceProviderController.addService);

module.exports = router