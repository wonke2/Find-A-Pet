import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";

const AddService = () => {
  const navigate = useNavigate();
  const [serviceName, setServiceName] = useState("");
  const [serviceDescription, setServiceDescription] = useState("");
  const [serviceLocation, setServiceLocation] = useState("");
  const [SPToken, setSPToken] = useState(localStorage.getItem("SPToken"));
  const dispatch = useDispatch();

  const handleAddService = async () => {
    try {
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
        console.log("Service added successfully");
        navigate("/spdashboard/sp-services");
      } else {
        console.error("Failed to add service");
      }
    } catch (error) {
      console.error("Error adding service:", error);
    }
  };

  return (
    <div>
      <h1>Add a Service</h1>
      <input
        type="text"
        placeholder="Service Name"
        value={serviceName}
        onChange={(e) => setServiceName(e.target.value)}
      />
      <input
        type="text"
        placeholder="Service Description"
        value={serviceDescription}
        onChange={(e) => setServiceDescription(e.target.value)}
      />
      <input
        type="text"
        placeholder="Service Location"
        value={serviceLocation}
        onChange={(e) => setServiceLocation(e.target.value)}
      />
      <button onClick={handleAddService}>Add Service</button>
      <Link to="/spdashboard/sp-services">Back to Services</Link>
    </div>
  );
};

export default AddService;
