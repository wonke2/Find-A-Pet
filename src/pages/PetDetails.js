// Importing necessary libraries and packages
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import '../styles/PetDetails.css';// Import specific styling for this component
import { useParams, Link } from 'react-router-dom'; // To handle routing and parameters in the URL
import sanitizeHtml from 'sanitize-html';  // For sanitizing the HTML content to prevent XSS attacks
import he from 'he';  // For decoding HTML entities to display text correctly
import { useSelector } from "react-redux"; // Hook for accessing state in the Redux store

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

    // Function to handle adding a pet to the wishlist
    const addToWishlist = async () => {
        if (!authTokenFromRedux) {
            alert("Please login to add to wishlist!");
            return;
        }

        try {
            // Making a POST request to the backend to add a pet to the wishlist
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
            // Alerting the user based on the response from the backend
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
        <div className="petdet-container">
            <Link to="/petlistings" className="petlistings-link">Back to Listings</Link>
            <div className="petdetails-wrapper">
                <div className="petdetails-left">
                    {/* Displaying pet image or a default image if not available */}
                    <img src={petDetails.photos?.[0]?.medium || 'https://static.vecteezy.com/system/resources/previews/017/047/854/original/cute-cat-illustration-cat-kawaii-chibi-drawing-style-cat-cartoon-vector.jpg'} alt={petDetails.name}
                        style={{ width: '200px', height: 'auto' }} />
                </div>
                <div className="petdetails-right">
                    <h2>{he.decode(sanitizeHtml(petDetails.name, { allowedTags: [] }))}</h2>  {/* Displaying pet name */}
                    {/* Sanitizing and decoding HTML content for pet description */}
                    <p>Description: {he.decode(sanitizeHtml(petDetails.description, { allowedTags: [] }))} {petDetails.url ? <a href={petDetails.url} target="_blank" rel="noopener noreferrer">
                        Click Here for More Info
                    </a>
                        : 'URL not provided'}</p>
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
                                    <p>Address: {petDetails.contact.address.address1 || ''} {petDetails.contact.address.address2 || ''}</p>
                                    <p> {petDetails.contact.address.city}, {petDetails.contact.address.state} {petDetails.contact.address.postcode}, {petDetails.contact.address.country}</p>
                                </div>
                            )}
                        </div>
                    )}

                    <button onClick={addToWishlist}>Add to Wishlist</button>
                </div>
            </div>
            <div className="disclaimer">
                Disclaimer: This pet information is sourced from a third-party API. We hold no responsibility regarding the adoption process or any other related matters. Our role is merely to display the listing.
            </div>
        </div>
    );
}

export default PetDetails;
