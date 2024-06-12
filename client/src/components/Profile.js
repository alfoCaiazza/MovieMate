import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import './Profile.css';

const Profile = () => {
  const [user, setUser] = useState(null);
  const [favoriteMovies, setFavoriteMovies] = useState([]);

  useEffect(() => {
    fetch('/api/get_current_user')
      .then(response => response.json())
      .then(data => setUser(data.user))
      .catch(() => setUser(null));
  }, []);

  useEffect(() => {
    const fetchFavorites = async () => {
      if (user) {
        try {
          const response = await fetch(`/api/get_user_favorites/${user._id}`);
          if (!response.ok) {
            throw new Error('Failed to fetch user favorites');
          }
          const data = await response.json();
          console.log('Favorite movies:', data); // Aggiungi questo console.log per debug
          setFavoriteMovies(data.favorite_movies);
        } catch (error) {
          console.error('Error fetching user favorites:', error);
        }
      }
    };
  
    fetchFavorites();
  }, [user]);
  

  if (!user) {
    return <p>Loading...</p>;
  }

  return (
    <div className="profile">
      <h1>Hi, {user.name}!</h1>
      <div>
        <p>There's your favorite movies</p>
        {favoriteMovies.map(item => (
          <Link key={item._id} to={`/api/handle_movie/${item._id}`} className="result-item">
            <img src={item.Poster_Link} alt={item.Series_Title} className="featured-image" />
            <div className="result-content">
              <h3 className="result-title">{item.Series_Title}</h3>
              <p className="result-description">{item.Overview}</p>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default Profile;
