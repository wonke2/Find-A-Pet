const jwt = require("jsonwebtoken");
require("dotenv").config();
const secret = process.env.JWT_SECRET;
const User = require("../models/userSchema");
exports.createToken = (userId) => {
	const token = jwt.sign({ id: userId }, secret, { expiresIn: "7h" });
	return token;
};

exports.verifyToken = async (req, res, next) => {
	try {
		let token = req.headers.authorization;
		if (!token) {
			return res.status(401).json({ error: "Unauthorized" });
		}
		if (token.startsWith("Bearer")) {
			token = token.slice(7, token.length).trimLeft();
		}

		const verified = jwt.verify(token, secret);
		if (!verified) {
			return res.status(401).json({ error: "Unauthorized" });
		}

		req.user = await User.findById(verified.id);
		next();
	} catch (err) {
		console.error(err);
		return res.status(500).json({ error: "Internal Server Error" });
	}
};
