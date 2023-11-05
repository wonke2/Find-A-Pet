import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import { confirmAlert } from "react-confirm-alert";
import "../styles/SPServices.css";

const SPServices = () => {
  // Get SPToken from Redux store.
  const SPToken = useSelector((state) => state.SPToken);
  // State variable to hold services.
  const [services, setServices] = useState([]);

  // Use useEffect to fetch services and handle confirmations for service deletion.
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

  // Function to handle the deletion of a service with a confirmation dialog.
const handleDeleteService = (serviceId) => {
  const confirmDeletion = window.confirm("Are you sure you want to delete this service?");

  if (confirmDeletion) {
    // User confirmed deletion, you can proceed with the deletion logic here.
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
  }
};


  return (
    <div className='spservice-container'>
      <Link to="/spdashboard" className='dashboard-link'>Back to Dashboard</Link>
      <h1>Your Services</h1>
      {services.length === 0 ? (
        <p className='no-services-message'>No services found</p>
      ) : (
        services.map((service) => (
          <div key={service._id} className='service-details'>
            <ul>
              <li><h2>{service.serviceName}</h2></li>
              <li><strong>Service Description:</strong> {service.serviceDescription}</li>
              <li><strong>Service Location:</strong> {service.serviceLocation}</li>
            </ul>
            <button onClick={() => handleDeleteService(service._id)} className="remove-service-btn">Delete Service</button>
          </div>
        ))
      )}
      <Link to="/spdashboard/sp-services/addservice" className="add-service-link">Add a Service</Link>
    </div>
  );
}
export default SPServices;
