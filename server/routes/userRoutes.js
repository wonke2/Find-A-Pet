const express = require("express");
const router = express.Router();
const userController = require("../controllers/userController");
const bookingController = require("../controllers/bookingController");
const jwtUtils = require("../utils/jwtUtils");

router.post("/signup", userController.signUp);
router.post("/login", userController.logIn);
router.get("/user", jwtUtils.verifyToken, userController.getUser);
router.get(
	"/booking",
	jwtUtils.verifyToken,
	bookingController.getBookingByUserId
);
router.post(
	"/booking/create",
	jwtUtils.verifyToken,
	bookingController.createBooking
);
module.exports = router;
