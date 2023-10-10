const User = require("../models/userSchema");
const jwtUtils = require("../utils/jwtUtils");
exports.signUp = async (req, res) => {
	const { username, password, email } = req.body;
	try {
		const user = await User.create({
			username,
			password,
			email,
			phoneNo,
			address,
		});
		if (user) {
			res.status(200).json({
				status: "success",
				data: user,
			});
		} else {
			res.status(400).json({
				status: "fail",
				message: "user not created",
			});
		}
	} catch (err) {
		res.status(500).json({
			status: "fail",
			message: err.message,
		});
	}
};

exports.logIn = async (req, res) => {
	const { username, password } = req.body;

	try {
		const user = await User.findOne({ username }).select("+password");
		if (!user) {
			res.status(404).json({
				status: "fail",
				message: "user not found",
			});
		}
		const isPasswordCorrect = await user.validatePassword(password);
		if (!isPasswordCorrect) {
			res.status(400).json({
				status: "fail",
				message: "invalid password",
			});
		}

		const token = jwtUtils.createToken(user._id);
		res.status(200).json({ token });
	} catch (err) {
		res.status(500).json({
			status: "fail",
			message: err.message,
		});
	}
};
