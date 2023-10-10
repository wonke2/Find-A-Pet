const User = require("../models/userSchema");
const jwtUtils = require("../utils/jwtUtils");
exports.signUp = async (req, res) => {
	const { username, password, email, phoneNo, address } = req.body;
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

			message: "user already exists",
		});
	}
};

exports.logIn = async (req, res) => {
	const { username, password } = req.body;

	try {
		const user = await User.findOne({ username }).select("+password");
		if (!user) {
			return res.status(404).json({
				status: "fail",
				message: "user not found",
			});
		}
		const isPasswordCorrect = await user.validatePassword(password);
		if (!isPasswordCorrect) {
			return res.status(400).json({
				status: "fail",
				message: "invalid password",
			});
		}
		const token = jwtUtils.createToken(user._id);
		return res.status(200).json({ token });
	} catch (err) {
		return res.status(500).json({
			status: "fail",
			message: "something went wrong",
		});
	}
};
exports.getUser = async (req, res) => {
	res.status(200).json({
		status: "success",
		data: req.user,
	});
};
