// Importing necessary libraries and styles
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import '../styles/App.css';

// Functional component for pet listings
const PetListings = () => {
  // State hooks for pets, API token, search term, filters, and filter visibility
  const [pets, setPets] = useState([]);
  const [token, setToken] = useState('');
  const [searchTerm, setSearchTerm] = useState('');
  const [submittedSearchTerm, setSubmittedSearchTerm] = useState('');
  const [filters, setFilters] = useState({ types: [], status: [] });
  const [showFilters, setShowFilters] = useState(false);
  const [showTypeFilter, setShowTypeFilter] = useState(false);
  const [showStatusFilter, setShowStatusFilter] = useState(false);

  // Function to get API token
  const getApiToken = async () => {
    try {
      const response = await axios.get('http://localhost:3001/api/petfinder/token');
      setToken(response.data.accessToken);
    } catch (error) {
      console.error('There was an error retrieving the token!', error);
    }
  };

  // Effect hook to get API token on component mount
  useEffect(() => {
    getApiToken();
  }, []);

  // Effect hook to fetch pets whenever token, filters or submitted search term changes
  useEffect(() => {
    const getPets = async () => {
      if (token === '') return;

      // Setting up request parameters including headers and query parameters
      let params = {
        headers: { Authorization: `Bearer ${token}` },
        params: {}
      };

      // Adding filters to the request parameters if they are set
      if (filters.types.length > 0) params.params.type = filters.types.join(',');
      if (filters.status.length > 0) params.params.status = filters.status.join(',');
      if (submittedSearchTerm) params.params.name = submittedSearchTerm;

      // Fetching pets from the API and setting the pets state
      try {
        const response = await axios.get('https://api.petfinder.com/v2/animals', params);
        setPets(response.data.animals);
      } catch (error) {
        console.error('There was an error retrieving the pets!', error);
      }
    };

    getPets();
  }, [token, filters, submittedSearchTerm]);

  // Handling filter changes and updating the filters state
  const handleFilterChange = (e, filterCategory) => {
    const value = e.target.value;
    setFilters((prevFilters) => ({
      ...prevFilters,
      [filterCategory]: prevFilters[filterCategory].includes(value)
        ? prevFilters[filterCategory].filter((item) => item !== value)
        : [...prevFilters[filterCategory], value],
    }));
  };

  // Clearing the submitted search term if the search term is cleared
  useEffect(() => {
    if (searchTerm === '') {
      setSubmittedSearchTerm('');
    }
  }, [searchTerm]);

  // Handling search submission
  const handleSubmitSearch = (e) => {
    e.preventDefault();
    setSubmittedSearchTerm(searchTerm);
  }

  // Function to clear the search input
  const clearSearch = () => {
    setSearchTerm('');
  };

  // Toggle functions for showing/hiding filters
  const toggleFilters = () => setShowFilters(!showFilters);
  const toggleTypeFilter = () => setShowTypeFilter(!showTypeFilter);
  const toggleStatusFilter = () => setShowStatusFilter(!showStatusFilter);

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

      {pets.map(pet => {
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
      })}
    </div>
  );
};

export default PetListings;
