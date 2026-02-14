import { configureStore } from "@reduxjs/toolkit";
import { apiSlice } from "./api/apiSlice";
import authReducer from '../features/auth/authSlice'
import modalReducer from '../features/modalSlice'
import filtersReducer from '../features/filtersSlice'
import filtersTabReducer from '../features/filtersTabSlice'
import generalReduce from '../features/generalSlice'
import { setupListeners } from "@reduxjs/toolkit/query";
import logoutMiddleware from "./api/logoutMiddleware";

export const store = configureStore({
    reducer: {
        [apiSlice.reducerPath]: apiSlice.reducer,
        auth: authReducer,
        modal: modalReducer,
        filters: filtersReducer,
        filtersTab: filtersTabReducer,
        general: generalReduce
    },
    middleware: getDefaultMiddleware =>
        getDefaultMiddleware().concat(apiSlice.middleware, logoutMiddleware),
    devTools: false

});

setupListeners(store.dispatch)