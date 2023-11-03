import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import '../styles/WishList.css';

const Wishlist = () => {
    const [wishlist, setWishlist] = useState([]);
    const token = useSelector((state) => state.token); // Retrieve the token outside useEffect and functions

    useEffect(() => {
        const fetchWishlist = async () => {
            const response = await fetch("http://localhost:3000/auth/get-wishlist", {
                headers: {
                    "Authorization": `Bearer ${token}`
                }
            });
    
            const data = await response.json();
            if (data.status === "success") {
                setWishlist(data.wishlist);
            } else {
                alert(data.message);
            }
        };
    
        fetchWishlist();
    }, [token]); // Added token as a dependency since it's being used inside useEffect

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
                        <Link to={`/pet/${pet.petID}`}>{pet.petName}</Link>
                        <img src={pet.petImage || 'https://static.vecteezy.com/system/resources/previews/017/047/854/original/cute-cat-illustration-cat-kawaii-chibi-drawing-style-cat-cartoon-vector.jpg'} alt={pet.petName}
                style={{ width: '200px', height: 'auto' }}/>
                        <button onClick={() => removeFromWishlist(pet.petID)}>Remove</button>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default Wishlist;
