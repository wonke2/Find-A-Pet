import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import '../styles/PetListings.css';

const PetListings = () => {
  // State variables to hold data and UI states
  const [pets, setPets] = useState([]);
  const [token, setToken] = useState('');
  const [searchTerm, setSearchTerm] = useState('');
  const [submittedSearchTerm, setSubmittedSearchTerm] = useState('');
  const [filters, setFilters] = useState({ types: [], status: [] });
  const [showFilters, setShowFilters] = useState(false);
  const [showTypeFilter, setShowTypeFilter] = useState(false);
  const [showStatusFilter, setShowStatusFilter] = useState(false);
  const [mapView, setMapView] = useState(false);
  const [appliedFilters, setAppliedFilters] = useState({ types: [], status: [] });

  // Function to get API token
  const getApiToken = async () => {
    try {
      const response = await axios.get('/api/petfinder/token');
      setToken(response.data.accessToken);
    } catch (error) {
      console.error('There was an error retrieving the token!', error);
    }
  };

  // Function to fetch pets data from the API
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

  // Function to get geolocation based on address
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

  // Effect to get API token on component mount
  useEffect(() => {
    getApiToken();
  }, []);

  // Effect to get pets data when token, filters, or search term changes
  useEffect(() => {
    getPets();
  }, [token, filters, submittedSearchTerm]);

  // Handles changes in filter checkboxes
  const handleFilterChange = (e, filterCategory) => {
    const value = e.target.value;
    setFilters((prevFilters) => ({
      ...prevFilters,
      [filterCategory]: prevFilters[filterCategory].includes(value)
        ? prevFilters[filterCategory].filter((item) => item !== value)
        : [...prevFilters[filterCategory], value],
    }));
  };

  // Handles form submission for search
  const handleSubmitSearch = (e) => {
    e.preventDefault();
    setSubmittedSearchTerm(searchTerm);
  };

  // Clears the search input and results
  const clearSearch = () => {
    setSearchTerm('');
    setSubmittedSearchTerm('');
  };

  // Functions to toggle the visibility of filter sections
  const toggleFilters = () => setShowFilters(!showFilters);
  const toggleTypeFilter = () => setShowTypeFilter(!showTypeFilter);
  const toggleStatusFilter = () => setShowStatusFilter(!showStatusFilter);

  // Initializes the map view with markers for each pet
  const initMap = async () => {
    const map = L.map('map').setView([35, -115], 3.5);

    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
    }).addTo(map);

    for (const pet of pets) {
      const address = pet.contact.address.address1 + ', ' +
        pet.contact.address.city + ', ' +
        pet.contact.address.state + ', ' +
        pet.contact.address.postcode + ', ' +
        pet.contact.address.country;

      const { latitude, longitude } = await getGeolocation(address);

      if (latitude && longitude) {
        // Creating a custom icon
        const icon = L.icon({
          iconUrl: pet.photos && pet.photos[0]?.medium
            ? pet.photos[0].medium
            : 'https://static.vecteezy.com/system/resources/previews/017/047/854/original/cute-cat-illustration-cat-kawaii-chibi-drawing-style-cat-cartoon-vector.jpg',
          iconSize: [32, 32],
        });

        // Creating a marker with the custom icon
        const marker = L.marker([latitude, longitude], { icon: icon }).addTo(map);
        marker.bindPopup(`<b><a href="/pet/${pet.id}" id="petLink${pet.id}">${pet.name}</a></b><br><img src="${icon.options.iconUrl}" width="50" height="50">`); // Making pet name clickable and adding image to the popup

        // Event listener for popupopen to add a click event listener to the pet name link
        marker.on('popupopen', () => {
          const link = document.getElementById(`petLink${pet.id}`);
          link.addEventListener('click', (e) => {
            e.preventDefault();
            window.location.href = `/pet/${pet.id}`;
          });
        });
      }
    }
  };

  // Effect to initialize map when map view is enabled and pets data is available
  useEffect(() => {
    if (mapView) {
      console.log('Attempting to initialize map.');
      initMap();
    }
  }, [mapView, pets]);

  // Applies the selected filters
  const applyFilters = () => {
    setAppliedFilters(filters);
    toggleFilters();
  };

  // Effect to get pets data when token, applied filters, or search term changes
  useEffect(() => {
    getPets();
  }, [token, appliedFilters, submittedSearchTerm]);


  // Rendering component
  return (
    <>
      {/* Overlay and sidebar for filters */}
      <div className={showFilters ? "sidebar-overlay active" : "sidebar-overlay"} onClick={toggleFilters}></div>
      <div className={showFilters ? "sidebar open" : "sidebar"}>
        <div className="sidebar-header">
          <span>Refine Listings</span>
          <button onClick={toggleFilters} className="close-btn">X Close</button>
        </div>

        <span className="filter-label">Filter by</span>

        <div className="filter-content">
          <div className="filter-option" onClick={toggleTypeFilter}>
            Type
            <span>{showTypeFilter ? '▲' : '▼'}</span>
          </div>
          {showTypeFilter && (
            <div className="filter-options-container active">
              <div className="option">
                <input type="checkbox" value="Dog" id="dog" onChange={(e) => handleFilterChange(e, 'types')} />
                <label htmlFor="dog">Dog</label>
              </div>
              <div className="option">
                <input type="checkbox" value="Cat" id="cat" onChange={(e) => handleFilterChange(e, 'types')} />
                <label htmlFor="cat">Cat</label>
              </div>
              <div className="option">
                <input type="checkbox" value="Rabbit" id="rabbit" onChange={(e) => handleFilterChange(e, 'types')} />
                <label htmlFor="rabbit">Rabbit</label>
              </div>
              <div className="option">
                <input type="checkbox" value="Small & Furry" id="small & furry" onChange={(e) => handleFilterChange(e, 'types')} />
                <label htmlFor="small & furry">Small & Furry</label>
              </div>
              <div className="option">
                <input type="checkbox" value="Horse" id="horse" onChange={(e) => handleFilterChange(e, 'types')} />
                <label htmlFor="horse">Horse</label>
              </div>
              <div className="option">
                <input type="checkbox" value="Bird" id="bird" onChange={(e) => handleFilterChange(e, 'types')} />
                <label htmlFor="bird">Bird</label>
              </div>
              <div className="option">
                <input type="checkbox" value="Scales, Fins & Other" id="scales, fins & other" onChange={(e) => handleFilterChange(e, 'types')} />
                <label htmlFor="scales, fins & other">Scales, Fins & Other</label>
              </div>
              <div className="option">
                <input type="checkbox" value="Barnyard" id="barnyard" onChange={(e) => handleFilterChange(e, 'types')} />
                <label htmlFor="barnyard">Barnyard</label>
              </div>
            </div>
          )}
          <div className="filter-option" onClick={toggleStatusFilter}>
            Status
            <span>{showStatusFilter ? '▲' : '▼'}</span>
          </div>
          {showStatusFilter && (
            <div className="filter-options-container active">
              <div className="option">
                <input type="checkbox" value="Adoptable" id="adoptable" onChange={(e) => handleFilterChange(e, 'status')} />
                <label htmlFor="adoptable">Adoptable</label>
              </div>
              <div className="option">
                <input type="checkbox" value="Adopted" id="adopted" onChange={(e) => handleFilterChange(e, 'status')} />
                <label htmlFor="adopted">Adopted</label>
              </div>
              <div className="option">
                <input type="checkbox" value="Found" id="found" onChange={(e) => handleFilterChange(e, 'status')} />
                <label htmlFor="found">Found</label>
              </div>
            </div>
          )}
          <button onClick={applyFilters} className="apply-filters-btn">
            Apply Filters
          </button>
        </div>
      </div>

      <div className="main-content">
        <div className="top-bar">
          <button className="filter-button" onClick={toggleFilters}>Filter</button>
          <div className="search">
            <form onSubmit={handleSubmitSearch}>
              <input
                type="text"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                placeholder="Search pets by name" />
              {searchTerm && <button type="button" onClick={clearSearch}>&times;</button>}
              <button type="submit">Search</button>
            </form>
          </div>
        </div>


        {/* Button to toggle between map and list view */}
        <button onClick={() => setMapView(!mapView)}>
          {mapView ? 'Show Listings' : 'Show Map'}
        </button>

        {mapView ? (
          <div id="map" style={{ height: '500px', width: '100%' }}></div>
        ) : (
          pets.map((pet) => {
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
                  }} />
                <h3><Link to={`/pet/${pet.id}`}>{pet.name}</Link></h3>
              </div>
            );
          })
        )}
      </div></>
  );
}

export default PetListings;
