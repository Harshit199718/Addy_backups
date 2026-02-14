import { configureStore } from '@reduxjs/toolkit';
import { livechatapi } from '../api/livechatapi';
import chatSlice from './slices/chatSlice';
import userSlice from './slices/userSlice';
import generalSlice from './slices/generalSlice';

export const store = configureStore({
  reducer: {
    [livechatapi.reducerPath]: livechatapi.reducer,

    // other slices
    general: generalSlice,
    user: userSlice,
    chat: chatSlice,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(livechatapi.middleware),
});
