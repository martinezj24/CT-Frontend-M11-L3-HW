import React, { useState, useEffect } from "react";
import axios from 'axios';
import './CharacterList.css';

// Task 2: Fetch & Display Characters

const CharacterList = () => {
  const [characters, setCharacters] = useState([]);
  const [offset, setOffset] = useState(0);
  const [total, setTotal] = useState(0);
  const [loading, setLoading] = useState(false);
  const [filterLetter, setFilterLetter] = useState('');

  useEffect(() => {
    fetchCharacters();
  }, [filterLetter]);

  const fetchCharacters = async () => {
    setLoading(true);
    try {
      const response = await axios.get(
        `https://gateway.marvel.com/v1/public/characters?ts=1&apikey=30d25ddacc2cbe54e2a70aa61f9d4e07&hash=b586917f47ef9f94b3fd834269141c98&offset=${offset}${filterLetter ? `&nameStartsWith=${filterLetter}` : ''}`,
      );
      const data = response.data.data;
      setCharacters(prevCharacters => offset === 0 ? data.results : [...prevCharacters, ...data.results]);
      setTotal(data.total);
      setOffset(prevOffset => prevOffset + data.count);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
    setLoading(false);
  };

  const loadMoreCharacters = () => {
    if (characters.length < total) {
      fetchCharacters();
    }
  };

  const handleFilterChange = (e) => {
    const letter = e.target.value;
    setFilterLetter(letter);
    setCharacters([]); // Reset characters
    setOffset(0); // Reset offset
  };

  return (
    <div className="container">
        <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTjmHn7hDycWvYvGnj50dxygz2EUz8MBKKCqg&s" alt="marvel-logo" />
      <div className="filter-container">
        <label htmlFor="filter">Filter by first letter: </label>
        <select id="filter" value={filterLetter} onChange={handleFilterChange}>
          <option value="">All</option>
          {Array.from({ length: 26 }, (_, i) => String.fromCharCode(65 + i)).map(letter => (
            <option key={letter} value={letter}>{letter}</option>
          ))}
        </select>
      </div>
      <div className="grid-container">
        {characters.map((character) => (
          <div className="card" key={character.id}>
            <img
              src={`${character.thumbnail.path}.${character.thumbnail.extension}`}
              className="card-img"
              alt={character.name}
            />
            <div className="card-body">
              <h5 className="card-title">{character.name}</h5>
              <p className="card-text">
                {character.description
                  ? character.description
                  : 'No description available'}
              </p>
              <h6>Comic Appearances:</h6>
              <ul>
                {character.comics.items.slice(0, 5).map((comic, index) => ( // Display up to 5 comics
                  <li key={index}>{comic.name}</li>
                ))}
              </ul>
            </div>
          </div>
        ))}
      </div>
      {loading && <p>Loading...</p>}
      {characters.length < total && !loading && (
        <button onClick={loadMoreCharacters}>Load More</button>
      )}
    </div>
  );
};

export default CharacterList;


