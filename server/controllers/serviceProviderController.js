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
    const serviceP = req.user

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
  const serviceP = req.user;
  const {
    serviceName,
    serviceDescription,
    serviceLocation
  } = req.body;

  try {
    if (!serviceP) {
      return res.status(404).json({
        status: 'fail',
        message: 'Service provider not found',
      });
    }

    const newService = {
      serviceProviderName: serviceP.serviceProviderName,
      serviceName,
      serviceDescription,
      serviceLocation,
    };
    serviceP.servicesProvided.push(newService);

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

exports.getServices = async (req, res) => {
  try {
    const serviceP = req.user;

    if (!serviceP) {
      return res.status(404).json({
        status: 'fail',
        message: 'Service provider not found',
      });
    }

    const servicesProvided = serviceP.servicesProvided;

    res.status(200).json({
      status: 'success',
      data: servicesProvided,
    });
  } catch (error) {
    console.error('Error fetching services:', error.message);
    res.status(500).json({
      status: 'fail',
      message: 'Failed to fetch services',
    });
  }
};

exports.deleteService = async (req, res) => {
  try {
    const { serviceId } = req.params;
    const serviceP = req.user;

    if (!serviceP) {
      return res.status(404).json({
        status: 'fail',
        message: 'Service provider not found',
      });
    }

    serviceP.servicesProvided.pull(serviceId);
    await serviceP.save();

    res.status(200).json({
      status: 'success',
      message: 'Service deleted successfully',
    });
  } catch (error) {
    console.error('Error deleting service:', error.message);
    res.status(500).json({
      status: 'fail',
      message: 'Failed to delete service',
    });
  }
};