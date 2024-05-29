import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Header from './components/Header';
import Footer from './components/Footer';
import HomePage from './components/Homepage';
import InsertMovie from './components/InsertMovie';
import SignIn from './components/SignIn';
import SignUp from './components/SignUp';
import AdminDashboard from './components/AdminDashboard';
import Profile from './components/Profile';

const App = () => {
  return (
    <Router>
      <Header />
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/api/insert_movie" element={<InsertMovie />} />
          <Route path="/api/user_login" element={<SignIn />} />
          <Route path="/api/user_signup" element={<SignUp />} />
          <Route path="/api/admin_dashboard" element={<AdminDashboard />} />
          <Route path="/api/profile" element={<Profile />} />
        </Routes>
      <Footer />
    </Router>
  );
};

export default App;
