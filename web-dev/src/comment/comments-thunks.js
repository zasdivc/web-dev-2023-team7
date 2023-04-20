import {createAsyncThunk}
    from "@reduxjs/toolkit"
import * as service
    from "./comments-service"

export const findAllComments = createAsyncThunk(
    'comments/findAllComments', async () =>
        await service.findAllComments()
)

export const findCommentsByTrackId = createAsyncThunk(
    'comments/findCommentsByTrackId',async (trackId) =>
        await service.findCommentsByTrackId(trackId)
)

export const findCommentsByUserId = createAsyncThunk(
    'comments/findCommentsByUserId', async (userId) =>
        await service.findCommentsByUserId(userId)
)

export const createComment = createAsyncThunk(
    'comments/createComment', async (comment) => {
        const newComment = await service.createComment(comment);
        return newComment;
    }
)

export const deleteComment = createAsyncThunk(
    'comments/deleteComment', async (commentId) => {
        await service.deleteComment(commentId);
        return commentId;
    }
)


