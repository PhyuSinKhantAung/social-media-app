import { configureStore } from '@reduxjs/toolkit';
import postReducer from './post';
import commentReducer from './comment';

const store = configureStore({
  reducer: {
    post: postReducer,
    comment: commentReducer,
  },
});

export default store;
