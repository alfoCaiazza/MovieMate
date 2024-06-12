import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './AdminDashboard.css';

const AdminDashboard = () => {
  const navigate = useNavigate();

  const handleAddMovieClick = async => {
    navigate('/api/add_movie');
  }

  const handleManageMovieClick = async => {
    navigate('/api/get_movies');
  }

  return (
    <div className="admin-dashboard">
      <main className="main-content">
        <div className="dashboard-content">
          <div className="dashboard-item">
            <h3>Add Movies</h3>
            <p>Add new movies to the database.</p>
            <button onClick={handleAddMovieClick}>Add Movie</button>
          </div>
          <div className="dashboard-item">
            <h3>Manage Movies</h3>
            <p>Update movies infos</p>
            <button onClick={handleManageMovieClick}>Menage Movies</button>
          </div>
        </div>
      </main>
    </div>
  );
};

export default AdminDashboard;
