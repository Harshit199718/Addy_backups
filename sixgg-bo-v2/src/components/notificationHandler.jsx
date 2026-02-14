import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
// import { notification as notificationAntd} from 'antd';
import { clearNotification } from '../features/modalSlice';
import { App } from 'antd';

// Inside your Redux store setup file or a higher-level component
const NotificationHandler = () => {
    const dispatch = useDispatch();
    const notification = useSelector(state => state.modal.notification);
    const { notification: notificationAntd } = App.useApp();

    useEffect(() => {
        // Dispatch notification action when modalOpen changes to true
        if (notification && notification.notification ) {
            switch(notification.notification_status){
                case 'success':
                    notificationAntd.success({
                        message: `${notification.notification_message}`,
                        placement: 'bottom' // Adjust placement as needed
                    });
                break;
                case 'warning':
                    notificationAntd.warning({
                        message: `${notification.notification_message}`,
                        placement: 'bottom' // Adjust placement as needed
                    });
                break;
                case 'error':
                    notificationAntd.error({
                        message: `${notification.notification_message}`,
                        placement: 'bottom' // Adjust placement as needed
                    });
                break;
                default:
                    notificationAntd.success({
                        message: `${notification.notification_message}`,
                        placement: 'bottom' // Adjust placement as needed
                    });
            }
            dispatch(clearNotification())
        }
    }, [notification, dispatch]);

    return null

};

export default NotificationHandler;
