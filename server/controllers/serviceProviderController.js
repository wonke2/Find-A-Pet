// Import required modules
const serviceProvider = require("../models/serviceProviderSchema");
const jwtUtils = require("../utils/jwtUtils");

// Function to handle signing up a new service provider
exports.signUp = async (req, res) => {
  // Extract data from the request body
  const {
    serviceProviderName,
    orgName,
    serviceProviderAddress,
    serviceProviderPassword,
    serviceProviderEmail,
    serviceProviderPhone
  } = req.body;
  try {
    // Create a new service provider document in the database
    const serviceP = await serviceProvider.create({
      serviceProviderName,
      orgName,
      serviceProviderAddress,
      serviceProviderPassword,
      serviceProviderEmail,
      serviceProviderPhone,
    });
    if (serviceP) {
      // If successful, respond with a success message and data
      res.status(200).json({
        status: "success",
        data: serviceP,
      });
    } else {
      // If creation fails, respond with an error message
      res.status(400).json({
        status: "fail",
        message: "Service provider not created",
      });
    }
  } catch (err) {
    if (err.code === 11000) {
      // Handle duplicate key error (e.g., duplicate email or phone)
      res.status(400).json({
        status: "fail",
        message: "The Business Name, email, or phone number is already in use",
      });
    } else {
      // Handle other errors and log the error message
      res.status(500).json({
        status: "fail",
        message: "Please contact admin.",
      });
      console.log(err.message);
    }
  }
};

// Function to handle service provider login
exports.logIn = async (req, res) => {
  // Extract login credentials from the request body
  const {
    serviceProviderName,
    serviceProviderPassword
  } = req.body;
  try {
    // Find the service provider in the database by name and select the password
    const serviceP = await serviceProvider.findOne({
      serviceProviderName
    }).select("+serviceProviderPassword");
    if (!serviceP) {
      // If service provider not found, respond with a not found message
      return res.status(404).json({
        status: "fail",
        message: "Service provider not found",
      });
    }
    // Validate the provided password
    const isPasswordCorrect = await serviceP.validatePassword(serviceProviderPassword);
    if (!isPasswordCorrect) {
      // If the password is incorrect, respond with an error message
      return res.status(400).json({
        status: "fail",
        message: "Invalid password",
      });
    }

    // Create a JWT token for the authenticated service provider
    const SPToken = jwtUtils.createSPToken(serviceP._id);
    return res.status(200).json({
      status: "success",
      SPToken
    });
  } catch (err) {
    // Handle any other errors and respond with an error message
    return res.status(500).json({
      status: "fail",
      message: err.message,
    });
  }
};

// Function to get the current service provider's information
exports.getServiceProvider = async (req, res) => {
  try {
    // Get the authenticated service provider from the request
    const serviceP = req.user

    if (!serviceP) {
      // If service provider not found, respond with a not found message
      return res.status(404).json({
        status: "fail",
        message: "Service provider not found",
      });
    }

    // Respond with the service provider's data
    return res.status(200).json({
      status: "success",
      data: serviceP,
    });
  } catch (err) {
    // Handle errors and respond with an error message
    return res.status(500).json({
      status: "fail",
      message: err.message,
    });
  }
};

// Function to add a new service to the service provider's profile
exports.addService = async (req, res) => {
  // Get the authenticated service provider and service data from the request
  const serviceP = req.user;
  const {
    serviceName,
    serviceDescription,
    serviceLocation
  } = req.body;

  try {
    if (!serviceP) {
      // If service provider not found, respond with a not found message
      return res.status(404).json({
        status: 'fail',
        message: 'Service provider not found',
      });
    }

    // Create a new service and add it to the service provider's profile
    const newService = {
      serviceProviderName: serviceP.serviceProviderName,
      serviceName,
      serviceDescription,
      serviceLocation,
    };
    serviceP.servicesProvided.push(newService);

    // Save the updated service provider document
    await serviceP.save();

    // Respond with a success message and the new service data
    res.status(201).json({
      status: 'success',
      data: newService,
    });
  } catch (err) {
    console.error(err);
    // Handle errors and respond with an error message
    res.status(500).json({
      status: 'fail',
      message: 'Failed to add a new service',
    });
  }
};

// Function to get the list of services provided by the service provider
exports.getServices = async (req, res) => {
  try {
    // Get the authenticated service provider
    const serviceP = req.user;

    if (!serviceP) {
      // If service provider not found, respond with a not found message
      return res.status(404).json({
        status: 'fail',
        message: 'Service provider not found',
      });
    }

    // Get the list of services provided by the service provider and respond with it
    const servicesProvided = serviceP.servicesProvided;

    res.status(200).json({
      status: 'success',
      data: servicesProvided,
    });
  } catch (error) {
    console.error('Error fetching services:', error.message);
    // Handle errors and respond with an error message
    res.status(500).json({
      status: 'fail',
      message: 'Failed to fetch services',
    });
  }
};

// Function to delete a service from the service provider's profile
exports.deleteService = async (req, res) => {
  try {
    // Get the service ID from the request parameters and the authenticated service provider
    const {
      serviceId
    } = req.params;
    const serviceP = req.user;

    if (!serviceP) {
      // If service provider not found, respond with a not found message
      return res.status(404).json({
        status: 'fail',
        message: 'Service provider not found',
      });
    }

    // Remove the specified service from the service provider's profile and save the changes
    serviceP.servicesProvided.pull(serviceId);
    await serviceP.save();

    // Respond with a success message
    res.status(200).json({
      status: 'success',
      message: 'Service deleted successfully',
    });
  } catch (error) {
    console.error('Error deleting service:', error.message);
    // Handle errors and respond with an error message
    res.status(500).json({
      status: 'fail',
      message: 'Failed to delete service',
    });
  }
};
