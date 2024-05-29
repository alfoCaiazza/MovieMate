import React, { useState, useEffect } from 'react';
import './Profile.css';

const Profile = () => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    fetch('/api/get_current_user')
      .then(response => response.json())
      .then(data => setUser(data.user))
      .catch(() => setUser(null));
  }, []);

  if (!user) {
    return <p>Loading...</p>;
  }

  return (
    <div className="profile">
      <h1>Profile</h1>
      <p>Name: {user.name}</p>
      <p>Email: {user.email}</p>
      {/* Altre informazioni dell'utente */}
    </div>
  );
};

export default Profile;
