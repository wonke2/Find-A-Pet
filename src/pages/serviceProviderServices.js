import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { confirmAlert } from "react-confirm-alert";

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

    const handleDeleteService = (serviceId) => {
    confirmAlert({
      title: "Confirm Deletion",
      message: "Are you sure you want to delete this service?",
      buttons: [
        {
          label: "Yes",
          onClick: () => {
            fetch(`/SPAuth/services/${serviceId}`, {
              method: "DELETE",
              headers: {
                Authorization: `Bearer ${SPToken}`,
              },
            })
              .then((response) => {
                if (response.ok) {
                  console.log("Service deleted successfully");
                  window.location.reload();
                } else {
                  console.error("Failed to delete service");
                }
              })
              .catch((error) => {
                console.error("Error deleting service:", error);
              });
          },
        },
        {
          label: "No",
          onClick: () => {
          },
        },
      ],
    });
  };

  return (
    <div>
      <h1>Your Services</h1>
      <ul>
        {services.map((service) => (
          <li key={service._id}>
            <h2>{service.serviceName}<br /></h2>
            <strong>Service Description:</strong> {service.serviceDescription}<br />
            <strong>Service Location:</strong> {service.serviceLocation}<br />
            <button onClick={() => handleDeleteService(service._id)}>Delete Service</button>
          </li>
        ))}
          </ul>
        <Link to="/spdashboard/sp-services/addservice">Add a Service</Link>
    </div>
  );
};

export default ServiceProviderServices;
