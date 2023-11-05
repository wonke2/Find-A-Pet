import React, { useState, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom"; // For routing and navigation
import { useSelector } from "react-redux"; // To access Redux store state
import '../styles/WishList.css'; // Wishlist-specific styles
import sanitizeHtml from 'sanitize-html'; // To prevent XSS attacks by sanitizing user input
import he from 'he'; // To decode HTML entities

// Wishlist component
const Wishlist = () => {
    const [wishlist, setWishlist] = useState([]);// Local state to store wishlist items
    const navigate = useNavigate(); // Hook for navigating programmatically
    const token = useSelector((state) => state.token); // Retrieve the authentication token from the Redux store

    // Fetch wishlist items on component mount and when the token changes
    useEffect(() => {
        const fetchWishlist = async () => {
            if (!token) {
                // Redirect to login if there's no token
                navigate('/userlogin');
                return;
            }

            try {
                // Attempt to fetch wishlist data from the API
                const response = await fetch("/auth/get-wishlist", {
                    headers: {
                        "Authorization": `Bearer ${token}`
                    }
                });

                if (!response.ok) {
                    // Handle non-2xx HTTP responses
                    if (response.status === 401) {
                        // Token expired or invalid - redirect to login
                        navigate('/userlogin');
                        return;
                    }
                    throw new Error('Network response was not ok.');
                }

                // Process the response data
                const data = await response.json();
                if (data.status === "success") {
                    // Update local state with fetched wishlist
                    setWishlist(data.wishlist);
                } else {
                    // Handle other issues, like invalid token
                    if (data.message === 'Token is not valid') {
                        navigate('/userlogin');
                    } else {
                        alert(data.message);
                    }
                }
            } catch (error) {
                // Catch fetch errors
                console.error('There has been a problem with your fetch operation:', error);
            }
        };

        fetchWishlist();
    }, [token, navigate]); // Added token as a dependency since it's being used inside useEffect

    // Function to remove an item from the wishlist
    const removeFromWishlist = async (petID) => {
        // Send the request to remove the item from the wishlist
        const response = await fetch("/auth/remove-from-wishlist", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${token}`
            },
            body: JSON.stringify({ petID })
        });

        const data = await response.json();
        if (data.status === "fail") {
            // Alert the user if there was a problem
            alert(data.message);
        } else {
            // Update the wishlist state to remove the item
            setWishlist(prevWishlist => prevWishlist.filter(pet => pet.petID !== petID));
        }
    };

    // Render the Wishlist component
    return (
        <div className="wishlist-container">
            <Link to="/userdashboard" className="userdashboard-link">Back to Dashboard</Link>
            <h2>Your Wishlist</h2>
            <ul>
                {wishlist.map(pet => (
                    <li key={pet.petID}>
                        <img src={pet.petImage || 'https://static.vecteezy.com/system/resources/previews/017/047/854/original/cute-cat-illustration-cat-kawaii-chibi-drawing-style-cat-cartoon-vector.jpg'}
                            alt={he.decode(sanitizeHtml(pet.petName, { allowedTags: [] }))}
                            style={{ width: '200px', height: 'auto' }} />
                        <Link to={`/pet/${pet.petID}`} className="wishlistname-link">{he.decode(sanitizeHtml(pet.petName, { allowedTags: [] }))}</Link>
                        <button onClick={() => removeFromWishlist(pet.petID)}>Remove</button>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default Wishlist;
