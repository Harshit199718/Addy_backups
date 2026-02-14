import { configureStore } from "@reduxjs/toolkit";
import { livechatapi } from '../api/livechatapi';
import chatSlice from './slices/chatSlice';
import userSlice from './slices/userSlice';
import generalSlice from './slices/generalSlice';
import departmentsSlice from './slices/departmentsSlice';

export const store = configureStore({
  reducer: {
    [livechatapi.reducerPath]: livechatapi.reducer,

    // other slices
    generalData: generalSlice,
    user: userSlice,
    chat: chatSlice,
    department: departmentsSlice,
  },
  middleware: getDefaultMiddleware =>
      getDefaultMiddleware().concat(livechatapi.middleware),
  devTools: false
});
