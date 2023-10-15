import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import '../styles/App.css';

const PetListings = () => {
  const [pets, setPets] = useState([]);
  const [token, setToken] = useState('');
  const [searchTerm, setSearchTerm] = useState('');
  const [submittedSearchTerm, setSubmittedSearchTerm] = useState('');
  const [filters, setFilters] = useState({ types: [], status: [] });
  const [showFilters, setShowFilters] = useState(false);
  const [showTypeFilter, setShowTypeFilter] = useState(false);
  const [showStatusFilter, setShowStatusFilter] = useState(false);
  const [mapView, setMapView] = useState(false);

  const getApiToken = async () => {
    try {
      const response = await axios.get('/api/petfinder/token');
      setToken(response.data.accessToken);
    } catch (error) {
      console.error('There was an error retrieving the token!', error);
    }
  };

  const getPets = async () => {
    if (token === '') return;

    let params = {
      headers: { Authorization: `Bearer ${token}` },
      params: {}
    };

    if (filters.types.length > 0) params.params.type = filters.types.join(',');
    if (filters.status.length > 0) params.params.status = filters.status.join(',');
    if (submittedSearchTerm) params.params.name = submittedSearchTerm;

    try {
      const response = await axios.get('https://api.petfinder.com/v2/animals', params);
      setPets(response.data.animals);
    } catch (error) {
      console.error('There was an error retrieving the pets!', error);
    }
  };

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

  useEffect(() => {
    getApiToken();
  }, []);

  useEffect(() => {
    getPets();
  }, [token, filters, submittedSearchTerm]);

  const handleFilterChange = (e, filterCategory) => {
    const value = e.target.value;
    setFilters((prevFilters) => ({
      ...prevFilters,
      [filterCategory]: prevFilters[filterCategory].includes(value)
        ? prevFilters[filterCategory].filter((item) => item !== value)
        : [...prevFilters[filterCategory], value],
    }));
  };

  const handleSubmitSearch = (e) => {
    e.preventDefault();
    setSubmittedSearchTerm(searchTerm);
  };

  const clearSearch = () => {
    setSearchTerm('');
  };

  // Toggle functions for showing/hiding filters
  const toggleFilters = () => setShowFilters(!showFilters);
  const toggleTypeFilter = () => setShowTypeFilter(!showTypeFilter);
  const toggleStatusFilter = () => setShowStatusFilter(!showStatusFilter);

  const initMap = async () => {
    const map = L.map('map').setView([34.05, -118.24], 13);

    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
    }).addTo(map);

    console.log('Pets:', pets); // Log the pets array to inspect its data

    for (const pet of pets) {
        const address = pet.contact.address.address1 + ', ' +
            pet.contact.address.city + ', ' +
            pet.contact.address.state + ', ' +
            pet.contact.address.postcode + ', ' +
            pet.contact.address.country;

        const { latitude, longitude } = await getGeolocation(address);

        console.log('Coordinates:', latitude, longitude); // Log the coordinates to check their validity

        if (latitude && longitude) {
            L.marker([latitude, longitude]).addTo(map)
                .bindPopup(pet.name)
                .openPopup();
        }
    }
};


useEffect(() => {
  if (mapView) {
    console.log('Attempting to initialize map.');
    initMap();
  }
}, [mapView, pets]);
  

  // Rendering component
  return (
    <div>
      <form onSubmit={handleSubmitSearch}>
        <input
          type="text"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          placeholder="Search pets by name"
        />
        {searchTerm && <button type="button" onClick={clearSearch}>&times;</button>}
        <button type="submit">Search</button>
      </form>

      <div>
        <button onClick={toggleFilters}>Filter</button>
        {showFilters && (
          <div>
            <button onClick={toggleTypeFilter}>Type</button>
            {showTypeFilter && (
              <div>
                <label>
                  <input type="checkbox" value="Dog" onChange={(e) => handleFilterChange(e, 'types')} /> Dog
                </label>
                <label>
                  <input type="checkbox" value="Cat" onChange={(e) => handleFilterChange(e, 'types')} /> Cat
                </label>
                <label>
                  <input type="checkbox" value="Rabbit" onChange={(e) => handleFilterChange(e, 'types')} /> Rabbit
                </label>
                <label>
                  <input type="checkbox" value="Small & Furry" onChange={(e) => handleFilterChange(e, 'types')} /> Small & Furry
                </label>
                <label>
                  <input type="checkbox" value="Horse" onChange={(e) => handleFilterChange(e, 'types')} /> Horse
                </label>
                <label>
                  <input type="checkbox" value="Bird" onChange={(e) => handleFilterChange(e, 'types')} /> Bird
                </label>
                <label>
                  <input type="checkbox" value="Scales, Fins & Other" onChange={(e) => handleFilterChange(e, 'types')} /> Scales, Fins & Other
                </label>
                <label>
                  <input type="checkbox" value="Barnyard" onChange={(e) => handleFilterChange(e, 'types')} /> Barnyard
                </label>
              </div>
            )}
            <button onClick={toggleStatusFilter}>Status</button>
            {showStatusFilter && (
              <div>
                <label>
                  <input type="checkbox" value="Adoptable" onChange={(e) => handleFilterChange(e, 'status')} /> Adoptable
                </label>
                <label>
                  <input type="checkbox" value="Adopted" onChange={(e) => handleFilterChange(e, 'status')} /> Adopted
                </label>
                <label>
                  <input type="checkbox" value="Found" onChange={(e) => handleFilterChange(e, 'status')} /> Found
                </label>
              </div>
            )}
          </div>
        )}
      </div>

      {/* Button to toggle between map and list view */}
      <button onClick={() => setMapView(!mapView)}>
        {mapView ? 'Show Listings' : 'Show Map'}
      </button>

      {mapView ? (
      <div id="map" style={{ height: '500px', width: '100%' }}></div>
    ) : (
      // The existing code for listing view
      pets.map((pet) => {
          // Ensure pet location data is valid before creating markers
            const imageUrl = pet.photos && pet.photos[0]?.medium
              ? pet.photos[0].medium
              : 'https://static.vecteezy.com/system/resources/previews/017/047/854/original/cute-cat-illustration-cat-kawaii-chibi-drawing-style-cat-cartoon-vector.jpg';

            return (
              <div key={pet.id}>
                <img
                  src={imageUrl}
                  alt={pet.name}
                  style={{ width: '200px', height: 'auto' }}
                  onError={(e) => {
                    e.target.onerror = null;
                    e.target.src = 'https://static.vecteezy.com/system/resources/previews/017/047/854/original/cute-cat-illustration-cat-kawaii-chibi-drawing-style-cat-cartoon-vector.jpg';
                  }}
                />
                <h3><Link to={`/pet/${pet.id}`}>{pet.name}</Link></h3>
              </div>
            );
        })
      )}
    </div>
  );
}

export default PetListings;