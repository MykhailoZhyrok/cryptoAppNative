import { configureStore } from '@reduxjs/toolkit';
import postsReducer from '../postSlice/postsSlice'; 
import userReducer from '../authSlice/authSlice';

const store = configureStore({
  reducer: {
    posts: postsReducer,
    user: userReducer,}
});


export default store;
