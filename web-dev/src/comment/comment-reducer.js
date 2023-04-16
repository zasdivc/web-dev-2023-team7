import { createSlice } from "@reduxjs/toolkit";
import comments from './comments.json';

const currentUser = {
    "userId": 234,
    "userName": "Sophia",
    "userType": "regular",
};

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
                ...currentUser,
                _id: (new Date()).getTime(),
            })
        },
    }
});
export const {deleteComment, createComment} = commentSlice.actions;
export default commentSlice.reducer;