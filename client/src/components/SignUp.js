import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './SignUp.css';

const SignUp = ({ onUserUpdate }) => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [age, setAge] = useState('');
  const [genres, setGenres] = useState([]);
  const [error, setError] = useState('');
  const [message, setMessage] = useState('');
  const navigate = useNavigate();

  const genreOptions = ['Action', 'Comedy', 'Drama', 'Horror', 'Romance', 'Sci-Fi', 'Thriller'];

  const handleGenreChange = (e) => {
    const { value, checked } = e.target;
    if (checked) {
      setGenres([...genres, value]);
    } else {
      setGenres(genres.filter((genre) => genre !== value));
    }
  };

  const capitalizeKeys = (obj) => {
    const capitalizedObj = {};
    for (let key in obj) {
      if (obj.hasOwnProperty(key)) {
        const capitalizedKey = key.charAt(0).toUpperCase() + key.slice(1);
        capitalizedObj[capitalizedKey] = obj[key];
      }
    }
    return capitalizedObj;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const user = {
      name,
      email,
      password,
      age : parseInt(age),
      genres
    };

    const capitalizedUser = capitalizeKeys(user);

    try {
      const response = await fetch(`/api/user_signup?user=${encodeURIComponent(JSON.stringify(capitalizedUser))}`, {
        method: 'GET'
      });

      const data = await response.json();

      if (response.ok) {
        setMessage('Registration successful!');
        setError('');
        onUserUpdate(data.user); // Update the user state in App
        navigate('/');
      } else {
        setError(data.error);
        setMessage('');
      }
    } catch (err) {
      setError('Something went wrong. Please try again.');
      setMessage('');
    }
  };

  return (
    <div className="signup-page">
      <div className="signup-container">
        <h1>Sign Up</h1>
        {error && <p className="error">{error}</p>}
        {message && <p className="message">{message}</p>}
        <form onSubmit={handleSubmit}>
          <div className="form-horizontal">
            <div className="form-group">
              <label htmlFor="name">Name:</label>
              <input 
                type="text" 
                id="name" 
                name="name" 
                value={name}
                onChange={(e) => setName(e.target.value)}
                required 
              />
            </div>
            <div className="form-group">
              <label htmlFor="email">Email:</label>
              <input 
                type="email" 
                id="email" 
                name="email" 
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required 
              />
            </div>
            <div className="form-group">
              <label htmlFor="password">Password:</label>
              <input 
                type="password" 
                id="password" 
                name="password" 
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required 
              />
            </div>
            <div className="form-group">
              <label htmlFor="age">Age:</label>
              <input 
                type="number" 
                id="age" 
                name="age" 
                value={age}
                onChange={(e) => setAge(e.target.value)}
                required 
              />
            </div>
            <div className="form-group">
              <label>Favorite Genres:</label>
              <div className="genres-container">
                {genreOptions.map((genre) => (
                  <div key={genre} className="genre-option">
                    <input 
                      type="checkbox" 
                      id={genre} 
                      value={genre}
                      checked={genres.includes(genre)}
                      onChange={handleGenreChange}
                    />
                    <label htmlFor={genre}>{genre}</label>
                  </div>
                ))}
              </div>
            </div>
          </div>
          <button type="submit">Sign Up</button>
        </form>
      </div>
    </div>
  );
};

export default SignUp;
