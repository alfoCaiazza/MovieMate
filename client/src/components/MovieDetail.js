import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import './MovieDetail.css';

const MovieDetail = ({ user }) => {
  const { id } = useParams();
  const [movie, setMovie] = useState(null);
  const [rating, setRating] = useState(0);
  const [isFavorite, setIsFavorite] = useState(false);

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

  useEffect(() => {
    const fetchFavorites = async () => {
      if (user) {
        try {
          const response = await fetch(`/api/user_favorites/${user._id}`);
          if (!response.ok) {
            throw new Error('Failed to fetch user favorites');
          }
          const favorites = await response.json();

          const isFavorite = favorites.favorites.includes(id.toString())

          setIsFavorite(isFavorite);
        } catch (error) {
          console.error('Error fetching user favorites:', error);
        }
      }
    };
  
    fetchFavorites();
  }, [user, id]);
  

  const handleAddToFavorites = async () => {
    if (!user) {
      alert('You must be logged in to add to favorites.');
      return;
    }

    console.log('Adding to favorites for user:', user, 'and movie:', id);

    try {
      const response = await fetch('http://localhost:5000/api/add_to_favorites', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ user_id: user._id, movie_id: id }),
      });

      if (!response.ok) {
        throw new Error('Failed to add to favorites');
      } else {
        setIsFavorite(true);
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

    console.log('Rating change for user:', user, 'and movie:', id, 'with rating:', event.target.value);

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

  const handleRemoveFromFavorites = async () => {
    if (!user) {
      alert('You must be logged in to remove from favorites.');
      return;
    }
  
    console.log('Removing from favorites for user:', user, 'and movie:', id);
  
    try {
      const response = await fetch('http://localhost:5000/api/remove_from_favorites', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ user_id: user._id, movie_id: id }),
      });
  
      if (!response.ok) {
        throw new Error('Failed to remove from favorites');
      } else {
        setIsFavorite(false);
      }
  
      alert('Movie removed from favorites');
    } catch (error) {
      console.error('Error removing from favorites:', error);
      alert('An error occurred while removing from favorites');
    }
  };

  return (
    <div className="movie-detail">
      <img src={movie.Poster_Link} alt={movie.Series_Title} className="movie-poster" />
      <div className="movie-info">
        <h2 className="movie-title">{movie.Series_Title}</h2>
        <p className="movie-overiew">{movie.Released_Year} - {movie.Runtime} - {movie.Genre}</p>
        <p className="movie-overiew">Rating: {movie.IMDB_Rating}</p>
        <p className="movie-overview">{movie.Overview}</p>
        <h2 className="movie-title">Starring:</h2>
        <p className="movie-overview">{movie.Star1},{movie.Star2},{movie.Star3},{movie.Star4}</p>
        {user && (
          <div className="user-actions">
            {isFavorite ? (
              <button onClick={handleRemoveFromFavorites} className="favorites-button favorite">
                <i className="bi bi-heart-fill"></i> Remove from Favorites
              </button>
            ) : (
              <button onClick={handleAddToFavorites} className="favorites-button">
                <i className="bi bi-heart"></i> Add to Favorites
              </button>
            )}
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
