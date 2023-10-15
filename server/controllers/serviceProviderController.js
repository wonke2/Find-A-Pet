const serviceProvider = require("../models/serviceProviderSchema")
const jwtUtils = require("../utils/jwtUtils")
exports.signUp = async (req, res) => {
    const { serviceProviderName, orgName, serviceProviderAddress, serviceProviderPassword, serviceProviderEmail, serviceProviderPhone } = req.body
    try {
        const serviceP = await serviceProvider.create({
            serviceProviderName,
            orgName,
            serviceProviderAddress,
            serviceProviderPassword,
            serviceProviderEmail,
            serviceProviderPhone
        })
        if (serviceP) {
            res.status(200).json({
                status: "success",
                data: serviceP
            })
        } else {
            res.status(400).json({
                status: "fail",
                message: "service provider not created"
            })
        }
    } catch (err) {
        res.status(500).json({
            status: "fail",
            message: err.message
        })
    }
}

exports.logIn = async (req, res) => {
    const { serviceProviderName, serviceProviderPassword } = req.body
    try {
        const serviceP = await serviceProvider.findOne({ serviceProviderName }).select("+serviceProviderPassword")
        if (!serviceP) {
            res.status(404).json({
                status: "fail",
                message: "service provider not found"
            })
        }
        const isPasswordCorrect = await serviceP.validatePassword(serviceProviderPassword)
        if (!isPasswordCorrect) {
            res.status(400).json({
                status: "fail",
                message: "invalid password"
            })
        }
        const token = jwtUtils.createToken(serviceP._id)
        res.status(200).json({ token })
    } catch (err) {
        res.status(500).json({
            status: "fail",
            message: err.message
        })
    }
}
exports.getServiceProvider = async (req, res) => {
    try {
        res.status(200).json({
            status: "success",
            data: req.serviceP
        })
    } catch (err) {
        res.status(500).json({
            status: "fail",
            message: err.message
        })
    }
}