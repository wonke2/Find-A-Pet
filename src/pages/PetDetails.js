import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';

const PetDetails = () => {
  const [petDetails, setPetDetails] = useState({});
  const [token, setToken] = useState('');
  const { id } = useParams();  // Getting pet ID from the URL

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
    const getPetDetails = async () => {
      if (token === '') return;

      try {
        const response = await axios.get(`https://api.petfinder.com/v2/animals/${id}`, {
          headers: {
            Authorization: `Bearer ${token}`
          }
        });
        setPetDetails(response.data.animal);
      } catch (error) {
        console.error("There was an error retrieving the pet details!", error);
      }
    }

    if (token !== '') {
      getPetDetails();
    }
  }, [token, id]);

  return (
    <div>
      <h2>{petDetails.name}</h2>
      <p>Description: {petDetails.description}</p>
      <img src={petDetails.photos?.[0]?.medium || 'https://static.vecteezy.com/system/resources/previews/017/047/854/original/cute-cat-illustration-cat-kawaii-chibi-drawing-style-cat-cartoon-vector.jpg'} alt={petDetails.name} 
      style={{ width: '200px', height: 'auto' }}/>
      <p>Status: {petDetails.status}</p>
      {petDetails.contact && (
        <div>
          <h3>Contact Information:</h3>
          <p>Email: {petDetails.contact.email || 'Not provided'}</p>
          <p>Phone: {petDetails.contact.phone || 'Not provided'}</p>
          {petDetails.contact.address && (
            <div>
              <p>Address:</p>
              <p>{petDetails.contact.address.address1 || ''}</p>
              <p>{petDetails.contact.address.address2 || ''}</p>
              <p>{petDetails.contact.address.city}, {petDetails.contact.address.state} {petDetails.contact.address.postcode}</p>
              <p>{petDetails.contact.address.country}</p>
            </div>
          )}
        </div>
      )}

    </div>
  );
}

export default PetDetails;
