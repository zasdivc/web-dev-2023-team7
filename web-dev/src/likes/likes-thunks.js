import {createAsyncThunk}
    from "@reduxjs/toolkit"
import * as service
    from "./likes-service"

export const findLikesByUserId = createAsyncThunk(
    'likes/findLikesByUserId', async (userId) =>
        await service.findLikesByUserId(userId)
)

export const findLikesByTrackIdAndUserId = createAsyncThunk(
    'likes/findLikesByTrackIdAndUserId', async (trackId, userId) =>
        await service.findLikesByTrackIdAndUserId(trackId, userId)
)

export const createLike = createAsyncThunk(
    'likes/createLike', async (like) => {
        const newLike = await service.createLike(like);
        return newLike;
    }
)

export const deleteLike = createAsyncThunk(
    'likes/deleteLike', async (likeId) => {
        await service.deleteLike(likeId);
        return likeId;
    }
)
