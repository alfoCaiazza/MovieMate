import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import './MovieDetail.css';

const MovieDetail = ({ user }) => {
  const { id } = useParams();
  const [movie, setMovie] = useState(null);
  const [rating, setRating] = useState(0);

  useEffect(() => {
    const fetchMovie = async () => {
      try {
        const response = await fetch(`/api/handle_movie/${id}`);
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        const data = await response.json();
        setMovie(data);
      } catch (error) {
        console.error('Error fetching movie details:', error);
      }
    };

    fetchMovie();
  }, [id]);

  const handleAddToFavorites = async () => {
    if (!user) {
      alert('You must be logged in to add to favorites.');
      return;
    }

    try {
      const response = await fetch('/api/add_to_favorites', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ user_id: user._id, movie_id: id }),
      });

      if (!response.ok) {
        throw new Error('Failed to add to favorites');
      }

      alert('Movie added to favorites');
    } catch (error) {
      console.error('Error adding to favorites:', error);
      alert('An error occurred while adding to favorites');
    }
  };

  const handleRatingChange = async (event) => {
    if (!user) {
      alert('You must be logged in to rate this movie.');
      return;
    }

    setRating(event.target.value);

    try {
      const response = await fetch('/api/add_rating', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ user_id: user._id, movie_id: id, rating: event.target.value }),
      });

      if (!response.ok) {
        throw new Error('Failed to add rating');
      }

      alert('Rating added');
    } catch (error) {
      console.error('Error adding rating:', error);
      alert('An error occurred while adding rating');
    }
  };

  if (!movie) {
    return <div>Loading...</div>;
  }

  return (
    <div className="movie-detail">
      <img src={movie.Poster_Link} alt={movie.Series_Title} className="movie-poster" />
      <div className="movie-info">
        <h2 className="movie-title">{movie.Series_Title}</h2>
        <p className="movie-overview">{movie.Overview}</p>
        {user && (
          <div className="user-actions">
            <button onClick={handleAddToFavorites} className="favorites-button">
              <i className="bi bi-heart"></i> Add to Favorites
            </button>
            <div className="rating-section">
              <label>
                Rate this movie:
                <input
                  type="number"
                  min="0"
                  max="10"
                  value={rating}
                  onChange={handleRatingChange}
                  className="rating-input"
                />
              </label>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default MovieDetail;
