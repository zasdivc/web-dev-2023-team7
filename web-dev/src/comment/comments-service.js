import axios from 'axios';
const API_BASE = process.env.REACT_APP_API_BASE;
const COMMENTS_API = `${API_BASE}/comments`

export const findAllComments = async () => {
    const response = await axios.get(COMMENTS_API);
    const comments = response.data;
    return comments;
}
export const findCommentsByTrackId = async (trackId) => {
    const response = await axios.get(`${COMMENTS_API}/${trackId}`);
    const comments = response.data;
    return comments;
}

export const findCommentsByUserId = async (userId) => {
    const response = await axios.get(`${COMMENTS_API}/user/${userId}`);
    const comments = response.data;
    return comments;
}

export const createComment = async (comment) => {
    const response = await axios.post(COMMENTS_API, comment);
    return response.data;
}
export const deleteComment = async (cid) => {
    console.log(cid);
    const response = await axios
        .delete(`${COMMENTS_API}/${cid}`);
    return response.data;
}
