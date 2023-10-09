import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import '../styles/App.css'

const PetListings = () => {
  const [pets, setPets] = useState([]);
  const [token, setToken] = useState('');

  // Function to get the Petfinder API token from the server
  const getApiToken = async () => {
    try {
      const response = await axios.get('http://localhost:3001/api/petfinder/token');
      setToken(response.data.accessToken);
    } catch (error) {
      console.error("There was an error retrieving the token!", error);
    }
  }

  useEffect(() => {
    // Get the API token when the component mounts
    getApiToken();
  }, []);

  useEffect(() => {
    const getPets = async () => {
      // Make sure we have the token before trying to fetch pets
      if (token === '') return;

      try {
        const response = await axios.get('https://api.petfinder.com/v2/animals', {
          headers: {
            Authorization: `Bearer ${token}`
          }
        });
        setPets(response.data.animals);
      } catch (error) {
        console.error("There was an error retrieving the pets!", error);
      }
    }

    // Call getPets only if the token is available
    if (token !== '') {
      getPets();
    }
  }, [token]); // Added token as a dependency, so this useEffect will run every time the token changes

  return (
    <div>
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
