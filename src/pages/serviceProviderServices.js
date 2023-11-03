import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";

const ServiceProviderServices = () => {
  const [SPToken, setSPToken] = useState(localStorage.getItem("SPToken"));
  const [services, setServices] = useState([]);

  useEffect(() => {
    async function fetchServices() {
      try {
        const response = await fetch("/SPAuth/services", {
          method: "GET",
          headers: {
            Authorization: `Bearer ${SPToken}`,
          },
        });

        if (response.ok) {
          const data = await response.json();
          setServices(data.data);
        } else {
          console.error("Failed to fetch services");
        }
      } catch (error) {
        console.error("Error fetching services:", error);
      }
    }

    fetchServices();
  }, [SPToken]);

  return (
    <div>
      <h1>Your Services</h1>
      <ul>
        {services.map((service) => (
          <li key={service._id}>
            <h2>{service.serviceName}<br /></h2>
            <strong>Service Description:</strong> {service.serviceDescription}<br />
            <strong>Service Location:</strong> {service.serviceLocation}<br />
          </li>
        ))}
          </ul>
        <Link to="/spdashboard/sp-services/addservice">Add a Service</Link>
    </div>
  );
};

export default ServiceProviderServices;
