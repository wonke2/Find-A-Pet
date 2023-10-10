const express = require('express')
const router = express.Router()
const serviceProviderController = require('../controllers/serviceProviderController')

router.post('/SPsignup', serviceProviderController.signUp)
router.post('/SPlogin', serviceProviderController.logIn)

module.exports = router