// ServiceListings.js
import React, { useState, useEffect } from 'react';

const ServiceListings = () => {
    const [services, setServices] = useState([]);

    useEffect(() => {
        fetch('/api/services/')
            .then(response => response.json())
            .then(data => setServices(data))
            .catch(error => console.error('Error fetching services:', error));
    }, []);

    return (
        <div className="service-listings">
            {services.map((service) => (
                <div key={service._id} className="service">
                    <h3>{service.serviceName}</h3>
                    <p>{service.serviceDescription}</p>
                    <small>Location: {service.serviceLocation}</small>
                </div>
            ))}
        </div>
    );
};

export default ServiceListings;
