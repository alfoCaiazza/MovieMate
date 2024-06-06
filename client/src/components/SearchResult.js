import React, { useEffect, useState } from 'react';
import { useLocation, Link } from 'react-router-dom';
import './SearchResult.css';

const useQuery = () => {
  return new URLSearchParams(useLocation().search);
};

const SearchResult = () => {
  const [searchResults, setSearchResults] = useState([]);
  const query = useQuery().get('query');

  useEffect(() => {
    const fetchSearchResults = async () => {
      try {
        const response = await fetch(`/api/search?query=${query}`);
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        const data = await response.json();
        setSearchResults(data);
      } catch (error) {
        console.error('Error fetching search results:', error);
      }
    };

    if (query) {
      fetchSearchResults();
    }
  }, [query]);

  return (
    <div className="search-results">
      {searchResults.map(item => (
        <Link key={item._id} to={`/api/handle_movie/${item._id}`} className="result-item">
          <img src={item.Poster_Link} alt={item.Series_Title} className="featured-image" />
          <div className="result-content">
            <h3 className="result-title">{item.Series_Title}</h3>
            <p className="result-description">{item.Overview}</p>
          </div>
        </Link>
      ))}
    </div>
  );
};

export default SearchResult;
