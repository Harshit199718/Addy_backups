import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    selectedPlayer: '',
    globalLoading: true,
    refetchBankMeter: false,
    reportSelectedTab: 'dashboard',
    isDarkMode: localStorage.getItem('darkMode') === 'true',
    livechatVisibility: false,
    livechatUnreadCount: 0,
    automaticMessagePayload: null,
    cashtTransferSelectedData: {
        id: '',
        selectedBankID: '',
        sites: '',
        transferType: '',
        isEdit: false,
    },
    languageSelected: localStorage.getItem('i18nLanguage') || (() => {
        localStorage.setItem('i18nLanguage', 'en');
        return 'en';
    })(),
    supportPersonalization: null,
    sideMenuCollapsed: true,
    transactionHighlight: localStorage.getItem('transactionHighlight'),
}

const generalSlice = createSlice({
    name: 'general',
    initialState,
    reducers: {
        setSelectedPlayer: (state, actions) => {
            const player = actions.payload.record
            if (typeof player === 'number') {
                state.selectedPlayer = player;
            } else {
                state.selectedPlayer = player?.id;
            }
        },
        resetSelectedPlayer: (state) => {
            state.selectedPlayer = null;
        },
        setPlayerActions: (state, actions) => {
            const player = actions.payload
            state.player = player;
        },
        setGlobalLoading: (state, actions) => {
            state.globalLoading = actions.payload.isLoading
        },
        setRefetchBankMeter: (state, actions) => {
            state.refetchBankMeter = actions.payload.refetchBankMeter
        },
        setReportSelectedTab: (state, action) => {
            state.reportSelectedTab = action.payload.key;
        },
        setCashTransferSelectedData: (state, action) => {
            state.cashtTransferSelectedData = {
                id: action.payload?.id,
                selectedBankID: action.payload?.selectedBankID,
                sites: action.payload?.sites,
                transferType: action.payload?.transferType,
                isEdit: action.payload?.isEdit,
            }
        },
        resetPlayerActions: (state) => {
            state.globalLoading = false
            state.player = null;
        },
        setDarkMode: (state, actions) => {
            localStorage.setItem('darkMode', actions.payload);
            state.isDarkMode = actions.payload
        },
        toggleLiveChat: (state, actions) => {
            state.livechatVisibility=actions.payload
        },
        setLiveChatUnreadCount: (state, actions) => {
            state.livechatUnreadCount=actions.payload
        },
        setAutomaticMessagePayload: (state, actions) => {
            state.automaticMessagePayload=actions.payload
        },
        setLanguageSelected: (state, actions) => {
            const lang = actions.payload;
            localStorage.setItem('i18nLanguage', lang);
            state.languageSelected = lang
        }, 
        setSupportPersonalization: (state, actions) => {
            let supportPersonalization = localStorage.getItem(`supportPersonalization${actions?.payload?.username}`)

            if(actions?.payload?.getContent){
                state.supportPersonalization = JSON.parse(supportPersonalization)
            } else {
                if(supportPersonalization != JSON.stringify(actions?.payload)){
                    localStorage.setItem(`supportPersonalization${actions?.payload?.username}`, JSON.stringify(actions?.payload));
                    supportPersonalization = JSON.stringify(actions?.payload);
                }
                state.supportPersonalization = JSON.parse(supportPersonalization)
            }
        }, 
        setSideMenuCollapsed: (state, actions) => {
            state.sideMenuCollapsed = actions.payload
        },
        setTransactionHighlight: (state, actions) => {
            localStorage.setItem('transactionHighlight', actions.payload)
            state.transactionHighlight = actions.payload
        },
        resetTransactionHighlight: (state, actions) => {
            localStorage.removeItem('transactionHighlight')
            state.transactionHighlight = null
        },
        resetState: (state, action) => {
            const resetState = {
                ...initialState,
                globalLoading: false
            }
            return resetState
        }
    },
})

export const getAutomaticMessagePayload = state => state.general.automaticMessagePayload;
export const selectLivechatVisibility = state => state.general.livechatVisibility;
export const selectLivechatUnreadCount = state => state.general.livechatUnreadCount;

export const { 
    setSelectedPlayer,
    resetSelectedPlayer,
    setPlayerActions, 
    setGlobalLoading, 
    setRefetchBankMeter,
    setCashTransferSelectedData,
    setReportSelectedTab, 
    resetPlayerActions, 
    setDarkMode, 
    toggleLiveChat, 
    setAutomaticMessagePayload,
    setLiveChatUnreadCount,
    setLanguageSelected,
    setSupportPersonalization,
    setSideMenuCollapsed,
    setTransactionHighlight,
    resetTransactionHighlight,
    resetState: resetGeneralState 
} = generalSlice.actions;

export default generalSlice.reducer;