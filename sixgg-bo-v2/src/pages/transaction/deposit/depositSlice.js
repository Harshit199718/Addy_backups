import { createSlice } from "@reduxjs/toolkit";

const depositSlice = createSlice({
    name: 'deposit',
    initialState: { 
        token: localStorage.getItem('access'), 
    },
    reducers: {
        setUsername (state, action) {
            localStorage.setItem('username', action.payload);
            state.username = action.payload;
        },
        resetState: () => initialState,
    },
})

export const selectUsername = state => state.auth.username;
export const { setCredentials, logOut, setUsername, resetState: resetDepositState } = depositSlice.actions;

export default depositSlice.reducer;