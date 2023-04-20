import axios from 'axios';
const API_BASE = process.env.REACT_APP_API_BASE;
const COMMENTS_API = `${API_BASE}/likes`

export const findLikesByUserId = async (userId) => {
    const response = await axios.get(`${COMMENTS_API}/user/${userId}`);
    const likes = response.data;
    return likes;
}

export const findLikesByTrackIdAndUserId = async (trackId, userId) => {
    const response = await axios.get(`${COMMENTS_API}/track/${trackId}/${userId}`);
    const likes = response.data;
    return likes;
}

export const createLike = async (like) => {
    const response = await axios.post(COMMENTS_API, like);
    return response.data;
}

export const deleteLike = async (likeId) => {
    console.log(likeId);
    const response = await axios
        .delete(`${COMMENTS_API}/${likeId}`);
    return response.data;
}
