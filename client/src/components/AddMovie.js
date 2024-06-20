import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './AddMovie.css';

const AddMovie = () => {
  const [formData, setFormData] = useState({
    Poster_Link: '',
    Series_Title: '',
    Released_Year: '',
    Certificate: '',
    Runtime: '',
    Genre: '',
    IMDB_Rating: '',
    Overview: '',
    Meta_Score: '',
    Director: '',
    Star1: '',
    Star2: '',
    Star3: '',
    Star4: '',
    No_of_Votes: '',
    Gross: ''
  });

  const [message, setMessage] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch(`/api/add_movie?movie=${encodeURIComponent(JSON.stringify(formData))}`, {
        method: 'GET'
      });

      const data = await response.json();

      if (response.ok) {
        setMessage('Movie added successfully!');
        setError('');
        navigate('/api/admin_dashboard');
      } else {
        setError(data.error);
        setMessage('');
      }
    } catch (err) {
      setError('Something went wrong. Please try again.');
      setMessage('');
    }
  };

  const formatLabel = (key) => {
    return key
      .replace(/_/g, ' ')
      .replace(/\b\w/g, char => char.toUpperCase());
  };

  return (
    <form onSubmit={handleSubmit} className="form">
      {Object.keys(formData).map((key) => (
        <div key={key} className="form-group">
          <label className="label">
            {formatLabel(key)}:
          </label>
          <input
            required
            type={key === 'Released_Year' || key === 'IMDB_Rating' || key === 'Meta_Score' || key === 'No_of_Votes' ? 'number' : 'text'}
            name={key}
            value={formData[key]}
            onChange={handleChange}
            className="input"
          />
        </div>
      ))}
      <button type="submit" className="button">Submit</button>
      {message && <p className="message">{message}</p>}
      {error && <p className="error">{error}</p>}
    </form>
  );
};

export default AddMovie;
