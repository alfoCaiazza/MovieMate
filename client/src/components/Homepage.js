import React from 'react';
import { useNavigate } from 'react-router-dom';

const HomePage = () => {
  const navigate = useNavigate();

  const handleInsertMovie = () => {
    navigate('/api/insert_movie');
  };

  return (
    <div style={styles.container}>
      <h1>Welcome to MovieMate</h1>
      <button style={styles.button} onClick={handleInsertMovie}>
        Inserisci Film
      </button>
    </div>
  );
};

const styles = {
  container: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    height: '100vh',
    backgroundColor: '#f0f0f0',
  },
  button: {
    padding: '10px 20px',
    fontSize: '16px',
    cursor: 'pointer',
  },
};

export default HomePage;
