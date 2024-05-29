import React from 'react';
import './AdminDashboard.css';

const AdminDashboard = () => {
  return (
    <div className="admin-dashboard">
      <main className="main-content">
        <div className="dashboard-content">
          <div className="dashboard-item">
            <h3>Add Movies</h3>
            <p>Add new movies to the database.</p>
            <button>Add Movie</button>
          </div>
          <div className="dashboard-item">
            <h3>Manage Movies</h3>
            <p>Update movies infos</p>
            <button>Menage Movies</button>
          </div>
          <div className="dashboard-item">
            <h3>Manage Users</h3>
            <p>View and manage registered users.</p>
            <button>Manage Users</button>
          </div>
          <div className="dashboard-item">
            <h3>View Insights</h3>
            <p>Analyze data and view insights.</p>
            <button>View Insights</button>
          </div>
        </div>
      </main>
    </div>
  );
};

export default AdminDashboard;
