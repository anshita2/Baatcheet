import { configureStore } from '@reduxjs/toolkit';
import userReducer from './userslice'; // adjust path if needed
import messageReducer from './messageslice';
import socketReducer from './socketslice';

const store = configureStore({
  reducer: {
    user: userReducer,
    message:messageReducer,
    socket:socketReducer
  }
});

export default store;
