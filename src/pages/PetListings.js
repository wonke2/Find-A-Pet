import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import '../styles/App.css'

const PetListings = () => {
  const [pets, setPets] = useState([]);
  const [token, setToken] = useState('');
  const [searchTerm, setSearchTerm] = useState('');
  const [submittedSearchTerm, setSubmittedSearchTerm] = useState('');

  const getApiToken = async () => {
    try {
      const response = await axios.get('http://localhost:3001/api/petfinder/token');
      setToken(response.data.accessToken);
    } catch (error) {
      console.error("There was an error retrieving the token!", error);
    }
  }

  useEffect(() => {
    getApiToken();
  }, []);

  useEffect(() => {
    const getPets = async () => {
      if (token === '') return;

      let params = {
        headers: {
          Authorization: `Bearer ${token}`
        }
      };

      if (submittedSearchTerm) {
        params = {
          ...params,
          params: {
            name: submittedSearchTerm
          }
        }
      }

      try {
        const response = await axios.get('https://api.petfinder.com/v2/animals', params);
        setPets(response.data.animals);
      } catch (error) {
        console.error("There was an error retrieving the pets!", error);
      }
    }

    getPets();
  }, [token, submittedSearchTerm]);

  const handleSubmitSearch = (e) => {
    e.preventDefault();
    setSubmittedSearchTerm(searchTerm);
  }

  return (
    <div>
      <form onSubmit={handleSubmitSearch}>
        <input 
          type="text" 
          value={searchTerm} 
          onChange={(e) => setSearchTerm(e.target.value)} 
          placeholder="Search pets by name" 
        />
        <button type="submit">Search</button>
      </form>

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
}

export default PetListings;
