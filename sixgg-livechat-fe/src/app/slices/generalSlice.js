import { createSlice } from '@reduxjs/toolkit';

const generalSlice = createSlice({
  name: 'general',
  initialState: {
    activeNav: "chats",
    theme: {},
    backofficeColors: {},
    settings: [],
    sidebarOpen: false
  },
  reducers: {
    setSettings(state, action){
      state.settings = action.payload;
    },
    setActiveNav(state, action){
      state.activeNav = action.payload;
    },
    setTheme(state, action) {
      state.theme = action.payload
    },
    setBackofficeColors(state, action) {
      state.backofficeColors = action.payload
    },
    setSidebarOpen(state, action) {
      state.sidebarOpen = action.payload
    },
  },
});

export const selectSidebarOpen = state => state.generalData.sidebarOpen
export const selectSettings = state => state.generalData.settings
export const selectActiveNav = state => state.generalData.activeNav
export const selectTheme = state => state.generalData.theme
export const selectBackofficeColors = state => state.generalData.backofficeColors

export const {setActiveNav, setTheme, setBackofficeColors, setSettings, setSidebarOpen} = generalSlice.actions;

export default generalSlice.reducer;
