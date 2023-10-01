import React, { useState, useEffect } from 'react'
import axios from 'axios'
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom'
import PetListings from './PetListings';
import './styles/App.css'

function App() {

  const Home = () => {
    return (
      <div className="App">
        <h2>Welcome to Find-a-Pet!</h2>;
      </div>
    )
  }

  return (
    <div className="App">
      <Router>
      <header className="App-header">
        <h1>Find-a-Pet</h1>
        <nav>
          <Link to ="/petlistings">
          <ul>PetListings</ul>
          </Link>
        </nav>
      </header>
        <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/petlistings" element={<PetListings />} />
            
        </Routes>
      </Router>
    </div>

  );
}

export default App;
