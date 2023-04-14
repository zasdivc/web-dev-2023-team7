import axios from "axios";
const SPOTIFY_API = "https://api.spotify.com/v1";
let spotify_token = "";
let token_timestamp = 0;

const clientId = 'e188a688ab104327b6ea5549bc65a34a';
const clientSecret = '119e41788dd142a0b0517d184ced32b8';

const getToken = async () =>{
    if (spotify_token && token_timestamp + 3600000 > Date.now()) {
        return spotify_token;
    } else {
        try {
            const response = await axios({
                method: 'post',
                url: 'https://accounts.spotify.com/api/token',
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded'
                },
                data: `grant_type=client_credentials&client_id=${clientId}&client_secret=${clientSecret}`
            });

            console.log(response.data.access_token);
            spotify_token = response.data.access_token;
            token_timestamp = Date.now();
            return spotify_token;
        } catch (error) {
            console.error(error);
        }
    };
};

export const getTrack = async (trackId) => {
    await getToken();
    const response = await axios({
        method: 'get',
        url: `${SPOTIFY_API}/tracks/${trackId}`,
        headers: {
            Authorization: `Bearer ${spotify_token}`
        },});
    return response.data;
};

