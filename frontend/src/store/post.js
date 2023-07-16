import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { getAuthToken } from '../services/loaderAuth';
import { callApi } from './callApi';
import { url } from '../config';

export const fetchPosts = createAsyncThunk('posts/fetchPosts', async () => {
  const response = await callApi(`${url}/posts/newsfeed`);
  return response.data;
});

export const createPost = createAsyncThunk('posts/create', async (postForm) => {
  const token = getAuthToken();

  await fetch(`${url}/posts`, {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${token}`,
    },
    body: postForm,
  });
});

export const deletePost = createAsyncThunk('posts/delete', async (id) => {
  await callApi(`${url}/posts/${id}`, 'DELETE');
  return id;
});

export const likePost = createAsyncThunk('posts/likePost', async (postId) => {
  await callApi(`${url}/likes/${postId}`, 'POST');
  return postId;
});

export const unlikePost = createAsyncThunk(
  'posts/unlikePost',
  async (postId) => {
    await callApi(`${url}/likes/${postId}`, 'DELETE');
    return postId;
  }
);

export const savePost = createAsyncThunk('posts/savePost', async (postId) => {
  await callApi(`${url}/saves/${postId}`, 'POST');
  return postId;
});

export const unsavePost = createAsyncThunk(
  'posts/unsavePost',
  async (postId) => {
    await callApi(`${url}/saves/${postId}`, 'DELETE');
    return postId;
  }
);

const initialState = {
  posts: [],
  status: 'idle',
  error: null,
};

const postSlice = createSlice({
  name: 'post',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchPosts.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchPosts.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.posts = action.payload;
      })
      .addCase(fetchPosts.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      })
      .addCase(createPost.fulfilled, (state, action) => {
        state.posts.push(action.payload);
      })
      .addCase(deletePost.fulfilled, (state, action) => {
        const posts = state.posts.filter((post) => post._id !== action.payload);
        state.posts = posts;
      })
      .addCase(likePost.fulfilled, (state, action) => {
        const post = state.posts.find((post) => post._id === action.payload);
        if (post) {
          post.like_count += 1;
        }
      })
      .addCase(unlikePost.fulfilled, (state, action) => {
        const post = state.posts.find((post) => post._id === action.payload);
        if (post) {
          post.like_count -= 1;
        }
      });
  },
});

export default postSlice.reducer;
