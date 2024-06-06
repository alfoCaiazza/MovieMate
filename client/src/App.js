import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Header from './components/Header';
import Footer from './components/Footer';
import HomePage from './components/Homepage';
import InsertMovie from './components/InsertMovie';
import SignIn from './components/SignIn';
import SignUp from './components/SignUp';
import AdminDashboard from './components/AdminDashboard';
import Profile from './components/Profile';
import AddMovie from './components/AddMovie';
import GetMovies from './components/GetMovies';
import GetUsers from './components/GetUsers';
import SearchResult from './components/SearchResult';
import MovieDetail from './components/MovieDetail';

const App = () => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    fetch('/api/get_current_user')
      .then(response => response.json())
      .then(data => setUser(data.user))
      .catch(() => setUser(null));
  }, []);

  const handleUserUpdate = (user) => {
    setUser(user);
  };

  return (
    <Router>
      <Header user={user} onUserUpdate={handleUserUpdate} />
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/api/insert_movie" element={<InsertMovie />} />
          <Route path="/api/user_login" element={<SignIn onUserUpdate={handleUserUpdate}/>} />
          <Route path="/api/user_signup" element={<SignUp onUserUpdate={handleUserUpdate}/>} />
          <Route path="/api/admin_dashboard" element={<AdminDashboard />} />
          <Route path="/api/profile" element={<Profile />} />
          <Route path="/api/add_movie" element={<AddMovie />} />
          <Route path="/api/get_movies" element={<GetMovies />} />
          <Route path="/api/get_users" element={<GetUsers />} />
          <Route path="/api/search" element={ <SearchResult />} />
          <Route path= "/api/handle_movie/:id" element={ <MovieDetail user={user}/>} />
        </Routes>
      <Footer />
    </Router>
  );
};

export default App;
