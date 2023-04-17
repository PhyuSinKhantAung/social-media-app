import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { callApi } from './callApi';
import { url } from '../config';

export const fetchComments = createAsyncThunk(
  'comments/fetchComments',
  async (postId) => {
    const response = await callApi(`${url}/comments/${postId}`);
    return response.data;
  }
);

export const createComment = createAsyncThunk(
  'comments/create',
  async ({ postId, comment }) => {
    const response = await callApi(
      `${url}/comments/${postId}`,
      'POST',
      comment
    );
    return response.data;
  }
);

export const updateComment = createAsyncThunk(
  'comments/update',
  async ({ commentId, comment }) => {
    const response = await callApi(
      `${url}/comments/${commentId}`,
      'PATCH',
      comment
    );
    return response.data;
  }
);

export const deleteComment = createAsyncThunk(
  'comments/delete',
  async ({ postId, commentId }) => {
    await callApi(`${url}/comments/${postId}/${commentId}`, 'DELETE');
    return commentId;
  }
);

const initialState = {
  comments: [],
  status: 'idle',
  error: null,
};

const commentSlice = createSlice({
  name: 'comment',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchComments.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchComments.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.comments = action.payload;
      })
      .addCase(fetchComments.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      })
      .addCase(createComment.fulfilled, (state, action) => {
        state.comments.push(action.payload);
      })
      .addCase(updateComment.fulfilled, (state, action) => {
        const { id, ...updatedComment } = action.payload;
        const existingComment = state.comments.find(
          (comment) => comment._id === id
        );
        if (existingComment) {
          Object.assign(existingComment, updatedComment);
        }
      })
      .addCase(deleteComment.fulfilled, (state, action) => {
        const comments = state.comments.filter(
          (comment) => comment._id !== action.payload
        );
        state.comments = comments;
      });
  },
});

export default commentSlice.reducer;
