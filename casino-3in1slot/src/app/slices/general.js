import { createSlice } from '@reduxjs/toolkit';
import i18n from '../../i18n';

const CONTACTUS_OPTION = import.meta.env.VITE_APP_CONTACTUS_OPTION;
const generalSlice = createSlice({
  name: 'skinConfig',
  initialState: {
    currentCountry: "",
    currentLang: "",
    globalError: null,
    sidebarOpen: false,
    currentUser: localStorage.getItem("user"),
    enableLiveChat: (CONTACTUS_OPTION==="supportboard") || (CONTACTUS_OPTION==="customlivechat"),
    livechatVisibility: false,
    automaticMessagePayload: null,
    unreadCount: 0,
    notificationPermission: null,
    notificationWebMessage: null,
    deferredPrompt: null,
    innerWidth: (() => {
      return window.innerWidth
    })(),
    selectedGame: null,
    activeCategory: null,
  },
  reducers: {
    setDeferredPrompt: (state, actions) => {
        state.deferredPrompt = actions.payload
    },
    toggleSidebar: state => {
        state.sidebarOpen = !state.sidebarOpen
    },
    setGlobalError: (state, actions) => {
        state.globalError = actions.payload
    },
    changeLanguage: (state, actions) => {
      const {country, language} = actions.payload;
      localStorage.setItem("i18nlanguage", language);
      i18n.changeLanguage(language);
      state.currentCountry = country;
      state.currentLang = language;
    },
    toggleLiveChat: (state, actions) => {
      state.livechatVisibility=actions.payload
    },
    setAutomaticMessagePayload: (state, actions) => {
      state.automaticMessagePayload=actions.payload
    },
    setUnreadMessages: (state, actions) => {
      state.unreadCount = actions.payload
    },
    setNotificationPermission: (state, actions) => {
      state.notificationPermission = actions.payload
    },
    setNotificationWebMessage: (state, actions) => {
      state.notificationWebMessage = actions.payload
    },
    setInnerWidth: (state, action) => {
      state.innerWidth = action?.payload
    },
    setSelectedGame: (state, action) => {
      state.selectedGame = action?.payload
    },
    setActiveCategory: (state, action) => {
      state.activeCategory = action?.payload
    },
  },
});

export const selectDeferredPrompt = state => state.general.deferredPrompt
export const selectGlobalError = state => state.general.globalError
export const selectCurrentCountry = state => state.general.currentCountry
export const selectCurrentLang = state => state.general.currentLang
export const selectEnableLiveChat = state => state.general.enableLiveChat
export const selectLivechatVisibility = state => state.general.livechatVisibility
export const selectAutomaticMessagePayload = state => state.general.automaticMessagePayload
export const selectUnreadCount = state => state.general.unreadCount
export const selectNotificationPermission = state => state.general.notificationPermission
export const selectNotificationWebMessage = state => state.general.notificationWebMessage
export const selectInnerWidth = state => state.general.innerWidth
export const selectSelectedGame = state => state.general.selectedGame
export const selectActiveCategory = state => state.general.activeCategory

export const { 
  setDeferredPrompt, 
  toggleSidebar, 
  setGlobalError, 
  changeLanguage, 
  toggleLiveChat, 
  setAutomaticMessagePayload, 
  setUnreadMessages, 
  setNotificationPermission, 
  setNotificationWebMessage, 
  setInnerWidth, 
  setSelectedGame,
  setActiveCategory
} = generalSlice.actions;
export default generalSlice.reducer;
