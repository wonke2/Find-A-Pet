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

exports.getServiceProvider = async (req, res) => {
  try {
    const id  = req.user._id

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

exports.addService = async (req, res) => {
  const serviceProviderId = req.user._id;
  const {
    serviceName,
    serviceDescription,
    serviceLocation
  } = req.body;

  try {
    // Find the logged-in SP by ID
    const serviceP = await serviceProvider.findById(serviceProviderId);

    if (!serviceP) {
      return res.status(404).json({
        status: 'fail',
        message: 'Service provider not found',
      });
    }

    // Create a new service object
    const newService = {
      serviceProviderName: serviceP.serviceProviderName,
      serviceName,
      serviceDescription,
      serviceLocation,
    };

    // Push the new service to the servicesProvided array
    serviceP.servicesProvided.push(newService);

    // Save the updated service provider document
    await serviceP.save();

    res.status(201).json({
      status: 'success',
      data: newService,
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({
      status: 'fail',
      message: 'Failed to add a new service',
    });
  }
};
