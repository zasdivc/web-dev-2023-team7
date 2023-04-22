import { createAsyncThunk } from "@reduxjs/toolkit";
import * as authService from "./auth-service.js";


export const loginThunk = createAsyncThunk(
    "users/login", async (credentials) => {
        const user = await authService.login(credentials);
        return user;
    }
);

export const profileThunk = createAsyncThunk(
    "users/profile", async () => {
        return await authService.profile();
    });


export const profileByUIDThunk = createAsyncThunk(
    "users/profileByUID",
    async (uid) => {
        const user = await authService.profileByUID(uid);
        return user;
    }
);

export const logoutThunk = createAsyncThunk(
    "users/logout", async () => {
        return await authService.logout();
    });


export const updateUserThunk = createAsyncThunk(
    "users", async (user) => {
        await authService.updateUser(user);
        return user;
    }
);
export const registerThunk = createAsyncThunk(
    "users/register", async (credentials) => {
        const user = await authService.register(credentials);
        return user;
    }
);
