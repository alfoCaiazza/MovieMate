import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import HomePage from './components/Homepage';
import InsertMovie from './components/InsertMovie';

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/api/insert_movie" element={<InsertMovie />} />
      </Routes>
    </Router>
  );
};

export default App;
