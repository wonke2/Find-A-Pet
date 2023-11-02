const serviceProvider = require("../models/serviceProviderSchema");
const jwtUtils = require("../utils/jwtUtils");

exports.signUp = async (req, res) => {
  const { serviceProviderName, orgName, serviceProviderAddress, serviceProviderPassword, serviceProviderEmail, serviceProviderPhone } = req.body;
  try {
    const serviceP = await serviceProvider.create({
      serviceProviderName,
      orgName,
      serviceProviderAddress,
      serviceProviderPassword,
      serviceProviderEmail,
      serviceProviderPhone,
    });
    if (serviceP) {
      res.status(200).json({
        status: "success",
        data: serviceP,
      });
    } else {
      res.status(400).json({
        status: "fail",
        message: "Service provider not created",
      });
    }
  } catch (err) {
    if (err.code === 11000) {
      res.status(400).json({
        status: "fail",
        message: "The Business Name, email or phone number is already in use",
      });
    } else {
      res.status(500).json({
        status: "fail",
        message: "Please contact admin.",
      });
      console.log(err.message);
    }
  }
};

exports.logIn = async (req, res) => {
  const { serviceProviderName, serviceProviderPassword } = req.body;
  try {
    const serviceP = await serviceProvider.findOne({ serviceProviderName }).select("+serviceProviderPassword");
    if (!serviceP) {
      return res.status(404).json({
        status: "fail",
        message: "Service provider not found",
      });
    }
    const isPasswordCorrect = await serviceP.validatePassword(serviceProviderPassword);
    if (!isPasswordCorrect) {
      return res.status(400).json({
        status: "fail",
        message: "Invalid password",
      });
    }
    
    const SPToken = jwtUtils.createSPToken(serviceP._id);
    return res.status(200).json({ status: "success", SPToken });
  } catch (err) {
    return res.status(500).json({
      status: "fail",
      message: err.message,
    });
  }
};

exports.addService = async (req, res) => {
  const { id, name, description, location } = req.body;
  
  try {
    const serviceProvider = await serviceProvider.findById(id);
    if (!serviceProvider) {
      return res.status(404).json({
        status: "fail",
        message: "Service provider not found",
      });
    }
    const newService = {
      name,
      description,
      location,
    };

    serviceProvider.servicesProvided.push(newService);

    await serviceProvider.save();

    return res.status(200).json({
      status: "success",
      message: "Service added successfully",
      data: newService,
    });
  } catch (err) {
    return res.status(500).json({
      status: "fail",
      message: err.message,
    });
  }
};

exports.getServiceProvider = async (req, res) => {
  try {
    const { id } = req.params

    const serviceP = await serviceProvider.findById(id)

    if (!serviceP) {
      return res.status(404).json({
        status: "fail",
        message: "Service provider not found",
      });
    }

    return res.status(200).json({
      status: "success",
      data: serviceP,
    });
  } catch (err) {
    return res.status(500).json({
      status: "fail",
      message: err.message,
    });
  }
};
