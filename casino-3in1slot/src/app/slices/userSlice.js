import { createSlice } from '@reduxjs/toolkit';

const userSlice = createSlice({
  name: 'user',
  initialState: {
    currentUser: localStorage.getItem("user"),
    tacSent: false,
    stealthLogin: false
  },
  reducers: {
    setCurrentUser(state, action){
      state.currentUser = action.payload
    },
    afterTacSent(state, actions){
      state.tacSent = actions.payload;
    },
    setStealthLogin(state, action){
      state.stealthLogin = action.payload
    },
  },
});

export const selectCurrentUser = state => state.user.currentUser
export const isTacSent = state => state.user.tacSent

export const {setCurrentUser, afterTacSent, setStealthLogin} = userSlice.actions;

export default userSlice.reducer;
