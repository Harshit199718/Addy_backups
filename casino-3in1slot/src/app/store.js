import { configureStore } from '@reduxjs/toolkit';
import general from './slices/general';
import userReducer from './slices/userSlice';
import { api } from '../api/api';
import { setupListeners } from "@reduxjs/toolkit/query";

export const store = configureStore({
  reducer: {
    api: api.reducer,

    // other slices
    general,
    user: userReducer
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(api.middleware),
});

setupListeners(store.dispatch)