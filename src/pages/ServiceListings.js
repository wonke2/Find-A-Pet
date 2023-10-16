import React, { useState, useEffect } from 'react';

const ServiceListings = () => {
    const [providers, setProviders] = useState([]);

    useEffect(() => {
        // Fetching the services from the provided API endpoint
        fetch('/api/services/')
            .then(response => response.json())
            .then(data => setProviders(data))
            .catch(error => console.error('Error fetching services:', error));
    }, []); // The empty array means this effect will run once when the component mounts

    return (
        <div className="service-listings">
            {providers.map((provider, index) => (
                <div key={index} className="provider">
                    <h3>{provider.serviceProviderName}</h3>
                    {provider.servicesProvided.map((service, sIndex) => (
                        <div key={sIndex} className="service">
                            {service}
                        </div>
                    ))}
                </div>
            ))}
        </div>
    );
};

export default ServiceListings;
