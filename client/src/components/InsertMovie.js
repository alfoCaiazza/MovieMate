import React, { useState } from 'react';
import axios from 'axios';

const InsertMovie = () => {
  const [movie, setMovie] = useState({
    poster: '',
    title: '',
    year: '',
    genre: '',
    rating: '',
  });
  const [message, setMessage] = useState('');

  const handleChange = (e) => {
    const { name, value } = e.target;
    setMovie((prevMovie) => ({
      ...prevMovie,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.get('/api/insert_movie', {
        params: {
          movie: JSON.stringify(movie)
        }
      });
      if (response.data.success) {
        setMessage(`Film inserito con successo! ID: ${response.data.inserted_id}`);
      } else {
        setMessage('Errore nell\'inserimento del film.');
      }
    } catch (error) {
      setMessage(`Errore: ${error.response?.data?.error || error.message}`);
    }
  };

  return (
    <div style={styles.container}>
      <h2>Inserisci un nuovo film</h2>
      <form onSubmit={handleSubmit} style={styles.form}>
        <div style={styles.formGroup}>
          <label style={styles.label} htmlFor="poster">Link del Poster</label>
          <input
            style={styles.input}
            type="text"
            id="poster"
            name="poster"
            value={movie.poster}
            onChange={handleChange}
          />
        </div>
        <div style={styles.formGroup}>
          <label style={styles.label} htmlFor="title">Titolo</label>
          <input
            style={styles.input}
            type="text"
            id="title"
            name="title"
            value={movie.title}
            onChange={handleChange}
          />
        </div>
        <div style={styles.formGroup}>
          <label style={styles.label} htmlFor="year">Anno</label>
          <input
            style={styles.input}
            type="number"
            id="year"
            name="year"
            value={movie.year}
            onChange={handleChange}
          />
        </div>
        <div style={styles.formGroup}>
          <label style={styles.label} htmlFor="genre">Genere</label>
          <input
            style={styles.input}
            type="text"
            id="genre"
            name="genre"
            value={movie.genre}
            onChange={handleChange}
          />
        </div>
        <div style={styles.formGroup}>
          <label style={styles.label} htmlFor="rating">Rating</label>
          <input
            style={styles.input}
            type="number"
            id="rating"
            name="rating"
            value={movie.rating}
            onChange={handleChange}
            step="0.1"
            min="0"
            max="10"
          />
        </div>
        <button style={styles.button} type="submit">Inserisci Film</button>
      </form>
      {message && <p>{message}</p>}
    </div>
  );
};

const styles = {
  container: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    padding: '20px',
    backgroundColor: '#f8f8f8',
    borderRadius: '8px',
    boxShadow: '0 0 10px rgba(0, 0, 0, 0.1)',
    maxWidth: '400px',
    margin: '20px auto',
  },
  form: {
    width: '100%',
    display: 'flex',
    flexDirection: 'column',
  },
  formGroup: {
    marginBottom: '15px',
  },
  label: {
    marginBottom: '5px',
    fontWeight: 'bold',
  },
  input: {
    padding: '10px',
    fontSize: '16px',
    borderRadius: '4px',
    border: '1px solid #ccc',
    width: '100%',
  },
  button: {
    padding: '10px 20px',
    fontSize: '16px',
    cursor: 'pointer',
    backgroundColor: '#007bff',
    color: '#fff',
    border: 'none',
    borderRadius: '4px',
    marginTop: '10px',
  },
};

export default InsertMovie;
