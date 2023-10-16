import React, { useState } from 'react';
import { getAccessToken, searchTracks } from '../api';

const Search = () => {
    const [query, setQuery] = useState('');
    const [results, setResults] = useState([]);

    const handleSearch = async () => {
        const accessToken = await getAccessToken();
        const tracks = await searchTracks(query, accessToken);
        setResults(tracks);
    };
    /*user clicks the "Search" button>>handleSearch is triggered>>>
    handleSearch requests access token>>using acquired token, request is made 
    to search for tracks*/
    return (
        <div>
            <input type="text" value={query} onChange={(e) => setQuery(e.target.value)} />
            <button onClick={handleSearch}>Search</button>
            <ul>
                {results.map((track) => (
                    <li key={track.id}>
                        <div>
                            <h3>{track.name}</h3>
                            <p>Artist: {track.artists.map((artist) => artist.name).join(', ')}</p>
                            <p>Album: {track.album.name}</p>
                            <button
                                onClick={() => {
                                    if (track.external_urls && track.external_urls.spotify) {
                                        window.open(track.external_urls.spotify, '_blank');
                                    } else {
                                        console.error('Missing Spotify URL for track:', track);
                                    }
                                }}
                            >
                                Listen
                            </button>
                        </div>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default Search;
