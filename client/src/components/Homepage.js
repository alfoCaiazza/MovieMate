import React, { useEffect, useState } from 'react';
import { useLocation, Link } from 'react-router-dom';
import axios from 'axios';
import './HomePage.css';

const HomePage = () => {
  const[user, setUser] = useState(null);
  const [featuredItems, setFeaturedItems] = useState([]);
  const [trailerItems, setTrailerItems] = useState([]);
  const [selectedItems, setSelectedItems] = useState([]);

  useEffect(() => {
    fetch('/api/get_current_user')
      .then(response => response.json())
      .then(data => setUser(data.user))
      .catch(() => setUser(null));
  }, []);

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

    const fetchSelectedItems = async () => {
      try{
        const response = await axios.get(`/api/selected_for_you/${user._id}`);
        setSelectedItems(response.data.recomanded_movies);
      } catch (error){
        console.error('Error fetchin seleted-for-you items:', error);
      }
    }
 
    fetchFeaturedItems();
    fetchTrailerItems();

    if(user){
      fetchSelectedItems();
    }
  }, [user]);

  return (
    <div className="homepage">
      <main className="main-content">
        <section className="hero">
          <div className="hero-text">
            <h1>Welcome to MovieMate</h1>
            <p>Your guide to movies, TV shows, and more.</p>
          </div>
        </section>
        {user && (
          <section className="trailers">
            <h2>Selected For You</h2>
            <div className="trailers-content">
              {selectedItems && selectedItems.map(item => (
                <div key={item._id} className="featured-item">
                  <img src={item.Poster_Link} alt={item.Series_Title} className="featured-image" />
                  <h3>{item.Series_Title}</h3>
                  <p>{item.Overview}</p>
                </div>
              ))}
            </div>
          </section>
        )}
        <section className="featured">
          <h2>Featured Today</h2>
          <div className="featured-content">
            {featuredItems.map(item => (
              <Link key={item._id} to={`/api/handle_movie/${item._id}`} className="link-item">
                <div key={item._id} className="featured-item">
                  <div className="featured-image-wrapper">
                    <img src={item.Poster_Link} alt={item.Series_Title} className="featured-image" />
                  </div>
                  <div className="featured-details">
                    <h3 className="featured-title">{item.Series_Title}</h3>
                    <p className="featured-overview">{item.Overview}</p>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </section>

        <section className="trailers">
          <h2>Latest Trailers</h2>
          <div className="trailers-content">
            {trailerItems.map(item => (
              <Link key={item._id} to={`/api/handle_movie/${item._id}`} className="link-item">
                <div key={item._id} className="featured-item">
                  <img src={item.Poster_Link} alt={item.Series_Title} className="featured-image" />
                  <h3>{item.Series_Title}</h3>
                  <p>{item.Overview}</p>
                </div>
              </Link>
            ))}
          </div>
        </section>
      </main>
    </div>
  );
};

export default HomePage;
