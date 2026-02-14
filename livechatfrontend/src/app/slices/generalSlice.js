import { createSlice } from '@reduxjs/toolkit';

const generalSlice = createSlice({
  name: 'general',
  initialState: {
    activeNav: "chats",
  },
  reducers: {
    setActiveNav(state, action){
      state.activeNav = action.payload;
    },
  },
});

export const selectActiveNav = state => state.general.activeNav

export const {setActiveNav} = generalSlice.actions;

export default generalSlice.reducer;
