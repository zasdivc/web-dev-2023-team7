import { createSlice } from "@reduxjs/toolkit";
import {
    loginThunk, logoutThunk, registerThunk,
    profileThunk, updateUserThunk,
} from "../../services/auth-thunks";


const authSlice = createSlice({
    name: "auth",
    initialState: { currentUser: JSON.parse(localStorage.getItem("currentUser")) },
    reducers: {},
    extraReducers: {
        [loginThunk.fulfilled]: (state, { payload }) => {
            localStorage.setItem("currentUser", JSON.stringify(payload));
            state.currentUser = payload;
        },
        [logoutThunk.fulfilled]: (state) => {
            localStorage.removeItem("currentUser");
            state.currentUser = null;
        },
        [profileThunk.fulfilled]: (state, { payload }) => {
            state.currentUser = payload;
        },
        [updateUserThunk.fulfilled]: (state, { payload }) => {
            localStorage.setItem("currentUser", JSON.stringify(payload));
            state.currentUser = payload;
        },
        [registerThunk.fulfilled]: (state, { payload }) => {
            localStorage.setItem("currentUser", JSON.stringify(payload));
            state.currentUser = payload;
        }
    },
});
export default authSlice.reducer;