import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './Header.css';

const Header = () => {
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    fetch('/api/get_current_user')
      .then(response => response.json())
      .then(data => setUser(data.user))
      .catch(() => setUser(null));
  }, []);

  const handleLogout = async () => {
    await fetch('/api/user_logout', { method: 'POST' });
    setUser(null);
    navigate('/');
    window.location.reload(); 
  };

  const handleProfileClick = async => {
    navigate('/api/profile');
  }

  return (
    <header className="header">
      <nav className="navbar">
        <div className="logo">
          <Link to="/" className="sign-in">MovieMate</Link>
        </div>
        <ul className="nav-links">
          <li>Explore</li>
        </ul>
        <div className="auth-links">
          {user ? (
            <>
              <button className="profile-icon" onClick={handleProfileClick}>
                <i className="bi bi-person"></i>  {/* Icona utente di Bootstrap */}
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
