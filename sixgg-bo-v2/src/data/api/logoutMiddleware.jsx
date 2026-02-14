import { logOut, resetAuthState } from '../../features/auth/authSlice';
import { resetFiltersState } from '../../features/filtersSlice';
import { resetFiltersTabState } from '../../features/filtersTabSlice';
import { resetGeneralState } from '../../features/generalSlice';
import { notification, resetModalState } from '../../features/modalSlice';
import { resetDepositState } from '../../pages/transaction/deposit/depositSlice';

const logoutMiddleware = store => next => action => {
    if (action.type === logOut.type) {
        const notificationStatus = action?.payload?.status || 'error'
        const notificationMessage = action?.payload?.message || 'Session Expired, Please Login Again'
        localStorage.removeItem('access');
        localStorage.removeItem('refresh');
        localStorage.removeItem('username');
        localStorage.removeItem('permissions');
        // Dispatch reset actions for each slice
        store.dispatch(resetAuthState());
        store.dispatch(resetFiltersState());
        store.dispatch(resetFiltersTabState());
        store.dispatch(resetGeneralState());
        store.dispatch(resetDepositState());
        store.dispatch(resetModalState());
        store.dispatch(notification({notification_status: notificationStatus, notification_message: notificationMessage}));
    }

    return next(action);
};

export default logoutMiddleware;