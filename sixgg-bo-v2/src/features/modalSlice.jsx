import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    modalOpen: false, 
    modalTabOpen: false, 
    selectedTab : 'transactionhistory',
    notification: {
        notification: false,
        notification_status: '', 
        notification_message: '', 
    }
}

const modalSlice = createSlice({
    name: 'modal',
    initialState,
    reducers: {
        openModal: (state) => {
            state.modalOpen = true;
        },
        closeModal: (state) => {
            state.modalOpen = false;
        },
        selectedTab: (state, action) => {
            state.selectedTab = action.payload.key;
        },
        openModalTab: (state) => {
            state.modalTabOpen = true;
        },
        closeModalTab: (state) => {
            state.modalTabOpen = false;
        },
        notification: (state, actions) => {
            state.notification = {
                notification: true,
                notification_status: actions.payload.notification_status,
                notification_message: actions.payload.notification_message
            };
        },
        clearNotification: (state) => {
            state.notification = {
                notification: false,
                notification_status: '',
                notification_message: ''
            };
        },
        resetState: () => initialState,
    },
})

export const { openModal, closeModal, openModalTab, closeModalTab, selectedTab, notification, clearNotification, resetState: resetModalState } = modalSlice.actions;

export default modalSlice.reducer;