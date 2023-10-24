const User = require("../models/userSchema");
const jwtUtils = require("../utils/jwtUtils");
exports.signUp = async (req, res) => {
	const { username, password, email, phoneNo, address } = req.body;
	if (!username || !password || !email || !phoneNo || !address) {
        return res.status(400).json({
            status: "fail",
            message: "User not created",
        });
    }

    try {
        const user = await User.create({
            username,
            password,
            email,
            phoneNo,
            address,
        });
        res.status(200).json({
            status: "success",
            data: user,
        });
    } catch (err) {
        // Check for unique constraint violation
        if (err.code === 11000) {
            return res.status(500).json({
                status: "fail",
                message: "User already exists",
            });
        }
        // Handle other errors
        res.status(400).json({
            status: "fail",
            message: "User not created",
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

exports.addToWishlist = async (req, res) => {
	try {
        const { petID, petName, petImage } = req.body;

        // Check if the pet is already in the wishlist
        const user = await User.findById(req.user._id);
        if (user.wishlist.some(pet => pet.petID === petID)) {
            return res.status(400).json({ status: "fail", message: "Pet already in wishlist" });
        }

        // If not, add the pet to the wishlist
        user.wishlist.push({ petID, petName, petImage });
        await user.save();

        res.status(200).json({ status: "success", message: "Added to wishlist" });
    } catch (error) {
        res.status(500).json({ status: "fail", message: error.message });
    }
};

exports.getWishlist = async (req, res) => {
    try {
        const user = await User.findById(req.user._id);
        if (!user) {
            return res.status(404).json({
                status: "fail",
                message: "User not found",
            });
        }
        return res.status(200).json({
            status: "success",
            wishlist: user.wishlist
        });
    } catch (error) {
        return res.status(500).json({
            status: "fail",
            message: error.message,
        });
    }
};

exports.removeFromWishlist = async (req, res) => {
    try {
        const { petID } = req.body;

        // Find the user
        const user = await User.findById(req.user._id);

        // Remove the pet from the wishlist
        const updatedWishlist = user.wishlist.filter(pet => pet.petID !== petID);
        user.wishlist = updatedWishlist;

        await user.save();

        res.status(200).json({ status: "success", message: "Removed from wishlist" });
    } catch (error) {
        res.status(500).json({ status: "fail", message: error.message });
    }
};