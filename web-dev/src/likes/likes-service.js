import axios from 'axios';
// const API_BASE = process.env.REACT_APP_API_BASE;
const API_BASE = process.env.REACT_APP_SERVER_API_URL;
const Likes_API = `${API_BASE}/likes`

export const findLikesByUserId = async (userId) => {
    const response = await axios.get(`${Likes_API}/user/${userId}`);
    const likes = response.data;
    return likes;
}

export const findLikesByTrackIdAndUserId = async (trackId, userId) => {
    const response = await axios.get(`${Likes_API}/track/${trackId}/${userId}`);
    const likes = response.data;
    return likes;
}

export const createLike = async (like) => {
    const response = await axios.post(Likes_API, like);
    return response.data;
}

export const deleteLike = async (likeId) => {
    console.log(likeId);
    const response = await axios
        .delete(`${Likes_API}/${likeId}`);
    return response.data;
}
