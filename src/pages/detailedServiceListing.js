import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';
import { useSelector } from "react-redux";
import '../styles/DetailedServiceListing.css';

const DetailedServiceListing = () => {
    const { serviceID } = useParams();
    const [serviceDetails, setServiceDetails] = useState(null);
    const [serviceProviderDetails, setServiceProviderDetails] = useState(null);
    const [user, setUser] = useState(null);
    const authTokenFromRedux = useSelector((state) => state.token);
    const navigate = useNavigate();

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

    

    useEffect(() => {
        if (authTokenFromRedux) {
            fetch("http://localhost:3000/auth/user", {
                headers: {
                    Authorization: `Bearer ${authTokenFromRedux}`,
                },
            })
            .then((res) => res.json())
            .then((data) => {
                if (data.status !== "fail") {
                    setUser(data.data);
                }
            });
        }
    }, [authTokenFromRedux]);
    

    const bookService = async () => {
        if (!authTokenFromRedux) {
            alert("Please login to book this service!");
            return;
        }
    
        if (!user) {
            alert("User information not loaded. Please try again.");
            return;
        }
    
        try {
            const serviceIndex = serviceProviderDetails.servicesProvided.findIndex(
                service => service.serviceName === serviceDetails.serviceName
            );
    
            if (serviceIndex === -1) {
                throw new Error('Service not found in provider list.');
            }
    
            const response = await fetch("http://localhost:3000/auth/bookings", { 
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${authTokenFromRedux}`
                },
                body: JSON.stringify({
                    userID: user._id,
                    serviceProviderID: serviceProviderDetails.id,
                    serviceIndex
                })
            });
    
            const data = await response.json();
            if (data.status === "fail") {
                alert(data.message);
            } else {
                alert("Service booked successfully!");
            }
        } catch (error) {
            console.error("There was an error booking the service!", error);
        }
    };
    


    if (!serviceDetails || !serviceProviderDetails) {
        return <p>Loading...</p>;
    }

    return (
        <div className="det-container">
            <Link to="/services" className='services-link'>Back to Services</Link>
            <div className='details-wrapper'>
                <div className='details-left'>
                    <h2>{serviceDetails.serviceName}</h2>
                    <p>{serviceDetails.serviceDescription}</p>
                    <small>Location: {serviceDetails.serviceLocation}</small>
                    <button onClick={bookService}>Book Now</button>
                </div>
                <div className="details-right">
                    <h3>Service Provider Details:</h3>
                    <p>Name: {serviceProviderDetails.serviceProviderName}</p>
                    <p>Email: {serviceProviderDetails.serviceProviderEmail}</p>
                    <p>Phone: {serviceProviderDetails.serviceProviderPhone}</p>
                    <p>Organization: {serviceProviderDetails.orgName}</p>
                    <p>Address: {serviceProviderDetails.serviceProviderAddress}</p>
                </div>
            </div>
        </div>
    );
};

export default DetailedServiceListing;
