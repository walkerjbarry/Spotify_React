import axios from 'axios';

const Spotify_api_url = 'https://api.spotify.com/v1';

export const getAccessToken = async () => {
    try {
        const clientId ='2fbfe0dd643b4067b9bf219d1f1752c0';
        const clientSecret ='6e87a55330a74fed925006bdacaf22a5';

        const response = await axios.post(
            'https://accounts.spotify.com/api/token',
            new URLSearchParams({
                grant_type: 'client_credentials',
            }),
            {
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded',
                    Authorization: `Basic ${btoa(`${clientId}:${clientSecret}`)}`,
                },
            }
        );

        if (response && response.data && response.data.access_token) {
            return response.data.access_token;
        } else {
            console.error('Error getting access token:', response);
            throw new Error('Invalid response from Spotify API');
        }
    } catch (error) {
        console.error('Token Request Error:', error.response ? error.response.data : error.message);
        throw error;
    }
};

export const searchTracks = async (query, accessToken) => {
    try {
        const response = await axios.get(`${Spotify_api_url}/search`, {
            params: {
                q: query,
                type: 'track',
            },
            headers: {
                Authorization: `Bearer ${accessToken}`,
            },
        });

        return response.data.tracks.items;
    } catch (error) {
        console.error('Token Request Error:', error.response ? error.response.data : error.message);
        throw error;
    }
};
