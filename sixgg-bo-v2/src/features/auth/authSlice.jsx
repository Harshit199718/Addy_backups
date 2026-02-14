import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    token: localStorage.getItem('access'), 
    refresh: null, 
    permission: localStorage.getItem('permissions'),  
    logoutMessage: ''
};

const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        setCredentials: (state, action) => {
            const { access, refresh, permissions } = action.payload;
            localStorage.setItem('access', access);
            if(refresh){
                localStorage.setItem('refresh', refresh);
                // state.refresh = refresh;
            }
            if(permissions){
                localStorage.setItem('permissions', permissions);
                state.permission = permissions;
            }

            state.token = access;

        },
        logOut: () => {},
        resetState: () => initialState,
    },
})

export const { setCredentials, logOut, resetState: resetAuthState } = authSlice.actions;

export default authSlice.reducer;