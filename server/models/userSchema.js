const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const bcrypt = require("bcrypt");
const saltRounds = 10;
const path = require('path')
require('dotenv').config({path: path.join(__dirname, '../../.env')})

url = process.env.MONGODB_U_URI

mongoose.connect(url, { useNewUrlParser: true, useUnifiedTopology: true })
	.then(() => {
		console.log("Connected to MongoDB")
	})
	.catch((error) => {
		console.log("Error connecting to MongoDB:", error.message)
	})
	
const userSchema = new Schema({
	username: { type: String, required: true, unique: true },
	email: { type: String, required: true, unique: true },
	phoneNo: { type: Number, required: true, unique: true },
	address: { type: String, required: true },
	password: { type: String, required: true, select: false },
	watchlist: [{
		type: mongoose.Schema.Types.ObjectId,
		ref: 'ServiceProvider.servicesProvided'
	}]
}); //hashing password
userSchema.pre("save", async function (next) {
	try {
		if (this.isModified("password")) {
			const hashedPassword = await bcrypt.hash(this.password, saltRounds);
			this.password = hashedPassword;
		}
		next();
	} catch (err) {
		next(err);
	}
});
//validating password
userSchema.methods.validatePassword = async function (password) {
	try {
		const result = bcrypt.compare(password, this.password);
		return result;
	} catch (err) {
		throw new Error(err);
	}
};

const User = mongoose.model("User", userSchema);

module.exports = User;
