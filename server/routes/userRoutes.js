const express = require("express");
const router = express.Router();
const userController = require("../controllers/userController");
const bookingController = require("../controllers/bookingController");
const jwtUtils = require("../utils/jwtUtils");

router.post("/signup", userController.signUp);
router.post("/login", userController.logIn);
router.get("/user", jwtUtils.verifyToken, userController.getUser);

router.post("/add-to-wishlist", jwtUtils.verifyToken, userController.addToWishlist);
router.post("/remove-from-wishlist", jwtUtils.verifyToken, userController.removeFromWishlist);
router.get("/get-wishlist", jwtUtils.verifyToken, userController.getWishlist);

router.post("/bookings", jwtUtils.verifyToken, bookingController.createBooking); // To create a booking
router.get("/user-bookings", jwtUtils.verifyToken, bookingController.getUserBookings); // To get bookings for a user


module.exports = router;
