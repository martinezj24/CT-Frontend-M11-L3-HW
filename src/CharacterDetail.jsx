import React, { useState, useEffect } from 'react';
import axios from 'axios';

// Task 3: Implement the Character Detail Feature

const CharacterDetail = ({ characterId }) => {
    const [character, setCharacter] = useState(null);

    useEffect(() => {
        if (characterId) {
            const fetchCharacterDetails = async () => {
                try {
                    const response = await axios.get(
                        'https://gateway.marvel.com/v1/public/characters',
                        {
                          params: {
                            ts: '1',
                            apikey: '30d25ddacc2cbe54e2a70aa61f9d4e07',
                            hash: '31f7f86db64459ce4cdd5a397c196119',
                          },
                    });
                    setCharacter(response.data.data.results[0]);
                } catch (error) {
                    console.error('Error fetching character details:', error);
                }
            };

            fetchCharacterDetails();
        }
    }, [characterId]);

    if (!character) {
        return <div>Please click Load Button to view more characters</div>;
    }

    return (
        <div className="character-detail">
            <h2>{character.name}</h2>
            <img src={`${character.thumbnail.path}.${character.thumbnail.extension}`} alt={character.name} />
            <p>{character.description}</p>
            <h3>Comics</h3>
            <ul>
                {character.comics.items.map(comic => (
                    <li key={comic.resourceURI}>{comic.name}</li>
                ))}
            </ul>
        </div>
    );
};

export default CharacterDetail;
