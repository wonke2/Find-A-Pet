// Importing necessary libraries and packages
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import sanitizeHtml from 'sanitize-html';  // For sanitizing the HTML content
import he from 'he';  // For decoding HTML entities
import { useSelector } from "react-redux";

// PetDetails functional component
const PetDetails = () => {
    // Using useState to create state variables for pet details and API token
    const [petDetails, setPetDetails] = useState({});
    const [apiToken, setApiToken] = useState('');

    // Retrieving the user authentication token using useSelector
    const authTokenFromRedux = useSelector((state) => state.token);

    // Extracting pet ID from the URL using useParams hook
    const { id } = useParams();

    // Function to retrieve API token for Petfinder
    const getApiToken = async () => {
        try {
            const response = await axios.get('/api/petfinder/token');
            setApiToken(response.data.accessToken);
        } catch (error) {
            console.error("There was an error retrieving the API token for Petfinder!", error);
        }
    }

    const addToWishlist = async () => {
        if (!authTokenFromRedux) {
            alert("Please login to add to wishlist!");
            return;
        }

        try {
            const response = await fetch("http://localhost:3000/auth/add-to-wishlist", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${authTokenFromRedux}`
                },
                body: JSON.stringify({
                    petID: petDetails.id, 
                    petName: petDetails.name, 
                    petImage: petDetails.photos?.[0]?.medium 
                })
            });

            const data = await response.json();
            if (data.status === "fail") {
                alert(data.message);
            } else {
                alert("Added to wishlist!");
            }
        } catch (error) {
            console.error("There was an error adding the pet to the wishlist!", error);
        }
    };

    // Using useEffect to call getApiToken function on component mount
    useEffect(() => {
        getApiToken();
    }, []);

    // Using useEffect to get pet details when apiToken is available and pet ID changes
    useEffect(() => {
        const getPetDetails = async () => {
            if (apiToken === '') return;

            try {
                const response = await axios.get(`https://api.petfinder.com/v2/animals/${id}`, {
                    headers: {
                        Authorization: `Bearer ${apiToken}`
                    }
                });
                setPetDetails(response.data.animal);
            } catch (error) {
                console.error("There was an error retrieving the pet details!", error);
            }
        }

        if (apiToken !== '') {
            getPetDetails();
        }
    }, [apiToken, id]);

    // Component rendering
    return (
        <div>
            <h2>{petDetails.name}</h2>  {/* Displaying pet name */}
            {/* Displaying pet image or a default image if not available */}
            <img src={petDetails.photos?.[0]?.medium || 'https://static.vecteezy.com/system/resources/previews/017/047/854/original/cute-cat-illustration-cat-kawaii-chibi-drawing-style-cat-cartoon-vector.jpg'} alt={petDetails.name}
                style={{ width: '200px', height: 'auto' }} />
            {/* Sanitizing and decoding HTML content for pet description */}
            <p>Description: {he.decode(sanitizeHtml(petDetails.description, { allowedTags: [] }))}</p>
            <p>Status: {petDetails.status}</p>  {/* Displaying pet status */}
            {/* Displaying contact information if available */}
            {petDetails.contact && (
                <div>
                    <h3>Contact Information:</h3>
                    <p>Email: {petDetails.contact.email || 'Not provided'}</p>
                    <p>Phone: {petDetails.contact.phone || 'Not provided'}</p>
                    {/* Displaying address information if available */}
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
            {/* Displaying pet information URL if available */}
            <p>{"For More Info: "}
                {petDetails.url ? <a href={petDetails.url} target="_blank" rel="noopener noreferrer">
                    Click Here
                </a>
                    : 'URL not provided'}
            </p>
            <button onClick={addToWishlist}>Add to Wishlist</button>

        </div>
    );
}

export default PetDetails;
