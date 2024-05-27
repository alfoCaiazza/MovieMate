import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './HomePage.css';

const HomePage = () => {
  const [featuredItems, setFeaturedItems] = useState([]);
  const [trailerItems, setTrailerItems] = useState([]);

  useEffect(() => {
    const fetchFeaturedItems = async () => {
      try {
        const response = await axios.get('/api/featured');
        setFeaturedItems(response.data);
      } catch (error) {
        console.error('Error fetching featured items:', error);
      }
    };

    const fetchTrailerItems = async () => {
      try {
        const response = await axios.get('/api/trailers');
        setTrailerItems(response.data);
      } catch (error) {
        console.error('Error fetching trailer items:', error);
      }
    };

    fetchFeaturedItems();
    fetchTrailerItems();
  }, []);

  return (
    <div className="homepage">
      <header className="header">
        <nav className="navbar">
          <div className="logo">MovieMate</div>
          <ul className="nav-links">
            <li>Movies</li>
            <li>TV Shows</li>
            <li>Watch</li>
            <li>Community</li>
          </ul>
          <div className="auth-links">
            <button className="sign-in">Sign In</button>
            <button className="sign-up">Sign Up</button>
          </div>
        </nav>
      </header>

      <main className="main-content">
        <section className="hero">
          <div className="hero-text">
            <h1>Welcome to MovieMate</h1>
            <p>Your guide to movies, TV shows, and more.</p>
          </div>
        </section>

        <section className="featured">
          <h2>Featured Today</h2>
          <div className="featured-content">
            {featuredItems.map(item => (
              <div key={item._id} className="featured-item">
                <img src={item.Poster_Link} alt={item.Series_Title} className="featured-image" />
                <h3>{item.Series_Title}</h3>
                <p>{item.Overview}</p>
              </div>
            ))}
          </div>
        </section>

        <section className="trailers">
          <h2>Latest Trailers</h2>
          <div className="trailers-content">
            {trailerItems.map(item => (
              <div key={item._id} className="trailer-item">
                <img src={item.Poster_Link} alt={item.Series_Title} className="featured-image" />
                <h3>{item.Series_Title}</h3>
                <p>{item.Overview}</p>
              </div>
            ))}
          </div>
        </section>
      </main>

      <footer className="footer">
        <p>&copy; 2024 MovieMate. All rights reserved.</p>
      </footer>
    </div>
  );
};

export default HomePage;
