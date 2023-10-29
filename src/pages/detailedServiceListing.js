import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';

const DetailedServiceListing = () => {
    const { serviceID } = useParams();
    const [serviceDetails, setServiceDetails] = useState(null);
    const [serviceProviderDetails, setServiceProviderDetails] = useState(null);
    
    useEffect(() => {
        fetch(`/api/services/${serviceID}`)
            .then(response => response.json())
            .then(data => {
                setServiceDetails(data);
            })
            .catch(error => console.error('Error fetching service details:', error));
    }, [serviceID]);

    useEffect(() => {
        if (serviceDetails) {
            fetch(`/api/serviceProviders`)
                .then(response => response.json())
                .then(data => {
                    const matchedProvider = data.find(provider => provider.serviceProviderName === serviceDetails.serviceProviderName);
                    if (matchedProvider) {
                        setServiceProviderDetails(matchedProvider);
                    } else {
                        throw new Error('Matching Service Provider not found.');
                    }
                })
                .catch(error => console.error('Error fetching service provider details:', error));
        }
    }, [serviceDetails]);


    if (!serviceDetails || !serviceProviderDetails) {
        return <p>Loading...</p>;
    }

    return (
        <div className="detailed-service-listing">
            <h2>{serviceDetails.serviceName}</h2>
            <p>{serviceDetails.serviceDescription}</p>
            <p>Location: {serviceDetails.serviceLocation}</p>
            <div className="provider-details">
                <h4>Service Provider Details:</h4>
                <p>Name: {serviceProviderDetails.serviceProviderName}</p>
                <p>Email: {serviceProviderDetails.serviceProviderEmail}</p>
                <p>Phone: {serviceProviderDetails.serviceProviderPhone}</p>
                <p>Organization: {serviceProviderDetails.orgName}</p>
                <p>Address: {serviceProviderDetails.serviceProviderAddress}</p>
            </div>
        </div>
    );
};

export default DetailedServiceListing;
