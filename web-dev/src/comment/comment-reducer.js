import { createSlice } from "@reduxjs/toolkit";
import comments from './comments.json';

// const currentUser = {
//     "userName": "NASA",
//     "handle": "@nasa",
//     "image": "nasa-logo.png",
// };
//
// const templateTuit = {
//     ...currentUser,
//     "topic": "Space",
//     "time": "2h",
//     "liked": false,
//     "replies": 0,
//     "retuits": 0,
//     "likes": 0,
// }



const commentSlice = createSlice({
    name: 'comments',
    initialState: comments,
    reducers: {
        deleteComment(state, action) {
            const index = state
                .findIndex(comment =>
                    comment._id === action.payload);
            state.splice(index, 1);
        },
        createComment(state, action) {
            state.unshift({
                ...action.payload,
                _id: (new Date()).getTime(),
            })
        },
    }
});
export const {deleteComment, createComment} = commentSlice.actions;
export default commentSlice.reducer;