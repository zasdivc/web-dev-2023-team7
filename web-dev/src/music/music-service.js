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
    console.log(`${SPOTIFY_API}/tracks/${trackId}`);
    const response = await axios({
        method: 'get',
        url: `${SPOTIFY_API}/tracks/${trackId}`,
        headers: {
            Authorization: `Bearer ${spotify_token}`
        },});
    return response.data;
};

export const getAlbum = async (albumId) => {
    await getToken();
    const response = await axios({
        method: 'get',
        url: `${SPOTIFY_API}/albums/${albumId}`,
        headers: {
            Authorization: `Bearer ${spotify_token}`
        },});
    return response.data;
};

export const getArtist = async (artistId) => {
    await getToken();
    const response = await axios({
        method: 'get',
        url: `${SPOTIFY_API}/artists/${artistId}`,
        headers: {
            Authorization: `Bearer ${spotify_token}`
        },});
    return response.data;
}

export const getArtistTopTracks = async (artistId) => {
    await getToken();
    const response = await axios({
        method: 'get',
        url: `${SPOTIFY_API}/artists/${artistId}/top-tracks?country=US`,
        headers: {
            Authorization: `Bearer ${spotify_token}`
        },});
    return response.data.tracks;
}

export const getTrackImage =  async(trackId) => {
    const track = await getTrack(trackId);
    return track.album.images[0].url;
}

export const getNewReleasedAlbums = async () => {
    await getToken();
    const response = await axios({
        method: 'get',
        url: `${SPOTIFY_API}/browse/new-releases?country=US&limit=10`,
        headers: {
            Authorization: `Bearer ${spotify_token}`
        },});
    return response.data.albums.items;
}

export const getTrackRecommendations = async () => {
    await getToken();
    const response = await axios({
        method: 'get',
        url: `${SPOTIFY_API}/recommendations?limit=10&market=US&seed_genres=classical`,
        headers: {
            Authorization: `Bearer ${spotify_token}`
        },});

    return response.data.tracks;
}

export const searchAlbumsAndTracks = async (query) => {
    await getToken();
    const response = await axios({
        method: 'get',
        url: `${SPOTIFY_API}/search?q=${query}&type=album,track`,
        headers: {
            Authorization: `Bearer ${spotify_token}`
        },});
    return response.data;
}