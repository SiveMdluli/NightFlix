import { useEffect, useState } from 'react';

import MovieCard from './MovieCard.jsx';

import './App.css';

const API_URL = 'https://www.omdbapi.com/?apikey=ea2f2c12';

const App = () => {
  // Creating a new state to move the code from the console log to them actually being rendered.
  const [movies, setMovies] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');

  const searchMovies = async (title) => {
    const response = await fetch(`${API_URL}&s=${title}`);
    const data = await response.json();

    setMovies(data.Search);
  };

  useEffect(() => {
    searchMovies('Avatar');
  }, []);

  return (
    <div className="app">
      <h1>NightFlix</h1>

      <div className="search">
        <input
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          placeholder="Search for movies"
        />

        <button
          className="search-button"
          onClick={() => searchMovies(searchTerm)}
        >
          Search
        </button>
      </div>

      {movies?.length > 0 ? (
        <div className="container">
          {movies.map((movie) => (
            <MovieCard movie={movie} />
          ))}
        </div>
      ) : (
        <div className="empty">
          <h2>No movies found</h2>
        </div>
      )}
    </div>
  );
};

export default App;
