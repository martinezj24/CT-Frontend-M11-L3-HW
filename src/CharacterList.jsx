import React, { useState, useEffect } from "react";
import axios from 'axios';
import './CharacterList.css';

// Task 2: Fetch & Display Characters

const CharacterList = () => {
  const [characters] = useState([]);

  useEffect(() => {
    fetchCharacters();
  }, []);

  const fetchCharacters = async () => {
    try {
      const response = await axios.get(
        'https://gateway.marvel.com/v1/public/characters?ts=1&apikey=30d25ddacc2cbe54e2a70aa61f9d4e07&hash=b586917f47ef9f94b3fd834269141c98',
        {
          params: {
            ts: '1',
            apikey: '30d25ddacc2cbe54e2a70aa61f9d4e07',
            hash: 'b586917f47ef9f94b3fd834269141c98',
          },
        }
      );
      console.log(response)
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  return (
    <div className="container">
      <h1>Marvel Characters</h1>
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
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default CharacterList;

