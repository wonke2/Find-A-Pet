import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import axios from 'axios';
import '../styles/ServiceListings.css';

const ServiceListings = () => {
    // State variables for services, search term, and map view.
    const [services, setServices] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');
    const [mapView, setMapView] = useState(false);

    // Fetch services data from the server when the component mounts.
    useEffect(() => {
        fetch('/api/services/')
            .then(response => response.json())
            .then(data => setServices(data))
            .catch(error => console.error('Error fetching services:', error));
    }, []);

    // Filter services based on the search term.
    const filteredServices = services.filter(service => 
        service.serviceName.toLowerCase().includes(searchTerm.toLowerCase()) || 
        service.serviceDescription.toLowerCase().includes(searchTerm.toLowerCase())
    );

    // Function to get geolocation based on an address.
    const getGeolocation = async (address) => {
        try {
            const response = await axios.get(`https://us1.locationiq.com/v1/search?key=${process.env.REACT_APP_MAP_API}&q=${encodeURIComponent(address)}&format=json`);
            if (response.data && response.data.length > 0) {
                return {
                    latitude: parseFloat(response.data[0].lat),
                    longitude: parseFloat(response.data[0].lon)
                };
            }
        } catch (error) {
            console.error('There was an error retrieving the geolocation!', error);
        }
        return { latitude: null, longitude: null };
    };

    // Initialize the Leaflet map.
    const initMap = async () => {
        const map = L.map('map').setView([35, -115], 3.5);

        L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
            attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        }).addTo(map);

        for (const service of services) {
            const address = service.serviceLocation;

            const { latitude, longitude } = await getGeolocation(address);

            if (latitude && longitude) {
                const icon = L.icon({
                    iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.0.0/images/marker-icon.png', // URL to the pin icon image
                    iconSize: [25, 41],
                    iconAnchor: [12, 41],
                    popupAnchor: [0, -41]
                });

                L.marker([latitude, longitude], { icon }).addTo(map)
                    .bindPopup(`<b>${service.serviceName}</b><br>${service.serviceDescription}`);
            }
        }
    };

    // Trigger map initialization when mapView or services change.
    useEffect(() => {
        if (mapView) {
            initMap();
        }
    }, [mapView, services]);

    return (
    <div className="service-listings">
        <div className="top-bar"> 
            <div className='search'>
                <input 
                    type="text" 
                    placeholder="Search for services..." 
                    value={searchTerm} 
                    onChange={e => setSearchTerm(e.target.value} />
                </div>
            </div>

        <button className='map-btn' onClick={() => setMapView(!mapView)}>
            {mapView ? 'Show Listings' : 'Show Map'}
        </button>
        <div id="map" style={{ height: '500px', width: '100%', display: mapView ? 'block' : 'none' }}></div>

        <div className="service-card" style={{ display: mapView ? 'none' : 'grid' }}>
            {filteredServices.map((service) => (
                <div key={service._id} className="service-listing-item">
                    <Link to={`/services/${service._id}`} key={service._id}>
                        <h3 className='name'>{service.serviceName}</h3>
                        <p className='description'>{service.serviceDescription}</p>
                        <small className='location'>Location: {service.serviceLocation}</small>
                    </Link>
                </div>
            ))}
        </div>
    </div>
    );
};

export default ServiceListings;
