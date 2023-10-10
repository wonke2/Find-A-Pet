const express = require("express");
const router = express.Router();
const userController = require("../controllers/userController");
const jwtUtils = require("../utils/jwtUtils");

router.post("/signup", userController.signUp);
router.post("/login", userController.logIn);
router.get("/user", jwtUtils.verifyToken, userController.getUser);

module.exports = router;
