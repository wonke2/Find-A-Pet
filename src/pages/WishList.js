import React, { useState, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom"; // Import useNavigate from react-router-dom
import { useSelector } from "react-redux";
import '../styles/WishList.css';

const Wishlist = () => {
    const [wishlist, setWishlist] = useState([]);
    const navigate = useNavigate(); // Create a navigate function
    const token = useSelector((state) => state.token);

    useEffect(() => {
        const fetchWishlist = async () => {
            if (!token) {
                // If there's no token, redirect to the login page
                navigate('/userlogin');
                return;
            }

            try {
                const response = await fetch("http://localhost:3000/auth/get-wishlist", {
                    headers: {
                        "Authorization": `Bearer ${token}`
                    }
                });

                if (!response.ok) {
                    if (response.status === 401) {
                        // If the response status is 401, it means the token is no longer valid
                        navigate('/userlogin');
                        return;
                    }
                    throw new Error('Network response was not ok.');
                }

                const data = await response.json();
                if (data.status === "success") {
                    setWishlist(data.wishlist);
                } else {
                    // If the token is not valid (e.g., expired), navigate to the login page
                    if (data.message === 'Token is not valid') {
                        navigate('/userlogin');
                    } else {
                        alert(data.message);
                    }
                }
            } catch (error) {
                console.error('There has been a problem with your fetch operation:', error);
            }
        };

        fetchWishlist();
    }, [token, navigate]); // Added token as a dependency since it's being used inside useEffect

    const removeFromWishlist = async (petID) => {
        const response = await fetch("http://localhost:3000/auth/remove-from-wishlist", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${token}`
            },
            body: JSON.stringify({ petID })
        });

        const data = await response.json();
        if (data.status === "fail") {
            alert(data.message);
        } else {
            setWishlist(prevWishlist => prevWishlist.filter(pet => pet.petID !== petID));
        }
    };

    return (
        <div className="wishlist-container">
            <h2>Your Wishlist</h2>
            <ul>
                {wishlist.map(pet => (
                    <li key={pet.petID}>
                        <img src={pet.petImage || 'https://static.vecteezy.com/system/resources/previews/017/047/854/original/cute-cat-illustration-cat-kawaii-chibi-drawing-style-cat-cartoon-vector.jpg'} alt={pet.petName}
                            style={{ width: '200px', height: 'auto' }} />
                        <Link to={`/pet/${pet.petID}`}>{pet.petName}</Link>
                        <button onClick={() => removeFromWishlist(pet.petID)}>Remove</button>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default Wishlist;
