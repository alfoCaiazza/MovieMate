import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './Header.css';

const Header = ({ user, onUserUpdate }) => {
  const [searchQuery, setSearchQuery] = useState('');
  const navigate = useNavigate();

  const handleLogout = async () => {
    await fetch('/api/user_logout', { method: 'POST' });
    onUserUpdate(null);
    navigate('/');
    window.location.reload();
  };

  const handleProfileClick = () => {
    navigate('/api/profile');
  };

  const handleSearch = (e) => {
    e.preventDefault();
    navigate(`/api/search?query=${searchQuery}`);
  };

  return (
    <header className="header">
      <nav className="navbar">
        <div className="logo">
          <Link to="/" className="sign-in">MovieMate</Link>
        </div>
        <form className="search-form" onSubmit={handleSearch}>
          <input 
            type="text" 
            value={searchQuery} 
            onChange={(e) => setSearchQuery(e.target.value)} 
            placeholder="Search Movie by Title" 
          />
          <button type="submit"><i className="bi bi-search"></i></button>
        </form>
        <div className="auth-links">
          {user ? (
            <>
              <button className="profile-icon" onClick={handleProfileClick}>
                <i className="bi bi-person"></i>
              </button>
              <button onClick={handleLogout}>Logout</button>
            </>
          ) : (
            <>
              <Link to="/api/user_login" className="sign-in">Sign In</Link>
              <Link to="/api/user_signup" className="sign-up">Sign Up</Link>
            </>
          )}
        </div>
      </nav>
    </header>
  );
};

export default Header;
