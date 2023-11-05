import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import "../styles/AddService.css";


const AddService = () => {
  // Initialize the navigate function for routing.
  const navigate = useNavigate();

  // Define state variables for service details.
  const [serviceName, setServiceName] = useState("");
  const [serviceDescription, setServiceDescription] = useState("");
  const [serviceLocation, setServiceLocation] = useState("");

  // Fetch the SPToken from Redux store.
  const SPToken = useSelector((state) => state.SPToken);

  // Handle the logic to add a service.
  const handleAddService = async () => {
    try {
      // Send a POST request to add a service.
      const response = await fetch("/SPauth/addservice", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${SPToken}`,
        },
        body: JSON.stringify({
          serviceName,
          serviceDescription,
          serviceLocation,
        }),
      });

      if (response.ok) {
        // If the response is successful, log a success message and navigate.
        console.log("Service added successfully");
        navigate("/spdashboard/sp-services");
      } else {
        // If the response is not successful, log an error message.
        console.error("Failed to add service");
      }
    } catch (error) {
      // Handle errors that occur during the process.
      console.error("Error adding service:", error);
    }
  };

  return (
    <>
      <div className="add-service-container">
      <Link className="backservice-link" to="/spdashboard/sp-services">Back to Services</Link>
        <h1>Add a Service</h1>
        {/* Input for Service Name */}
        <input
          type="text"
          placeholder="Service Name"
          value={serviceName}
          onChange={(e) => setServiceName(e.target.value)}
        />
        {/* Input for Service Description */}
        <input
          type="text"
          placeholder="Service Description"
          value={serviceDescription}
          onChange={(e) => setServiceDescription(e.target.value)}
        />
        {/* Input for Service Location */}
        <input
          type="text"
          placeholder="Service Location"
          value={serviceLocation}
          onChange={(e) => setServiceLocation(e.target.value)}
        />
        {/* Button to trigger service addition */}
        <button onClick={handleAddService}>Add Service</button>
      </div>
    </>
  );
};

export default AddService;
