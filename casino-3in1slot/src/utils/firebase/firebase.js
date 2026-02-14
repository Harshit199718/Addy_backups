// firebase.js
import { initializeApp } from '@firebase/app';
import { getMessaging, getToken, onMessage } from '@firebase/messaging';
import { useDispatch } from 'react-redux';
import { setNotificationPermission, setNotificationWebMessage } from '../../app/slices/general';
import { useEffect } from 'react';

const firebaseConfig = {
    apiKey: import.meta.env.VITE_APP_WEB_NOTIFICATION_API_KEY || "null",
    authDomain: import.meta.env.VITE_APP_WEB_NOTIFICATION_AUTH_DOMAIN || "null",
    projectId: import.meta.env.VITE_APP_WEB_NOTIFICATION_PROJECT_ID || "null",
    storageBucket: import.meta.env.VITE_APP_WEB_NOTIFICATION_STORAGE_BUCKET || "null",
    messagingSenderId: import.meta.env.VITE_APP_WEB_NOTIFICATION_MESSAGING_SENDER_ID || "null",
    appId: import.meta.env.VITE_APP_WEB_NOTIFICATION_APP_ID || "null",
    measurementId: import.meta.env.VITE_APP_WEB_NOTIFICATION_MEASUREMENT_ID || "null",
};

const firebaseApp = initializeApp(firebaseConfig);

const handleRequestWebPermission = async (enabledNotification) => {
    const messaging = enabledNotification ? getMessaging(firebaseApp) : null;

    try {
      const permission = await Notification.requestPermission();
      if (permission === 'granted') {
        const token = await getToken(messaging);
        console.log('FCM Token:', token);
      } else {
        console.error('Notification permission not granted');
      }
    } catch (error) {
      console.error('Error requesting notification permission:', error);
    }
};


const WebNotificationHandler = ({ enabledNotification }) => {
    const dispatch = useDispatch();
    const messaging = enabledNotification ? getMessaging(firebaseApp) : null;
    
    useEffect(() => {
        const awaitWebNotification = async () => {
            try {
                onMessage(messaging, (payload) => {
                    dispatch(setNotificationWebMessage(payload?.notification));
                    console.log('Foreground Message:', payload);
                });
            } catch (error) {
                console.error('Error setting up notifications:', error);
            }
        };

        awaitWebNotification();
    }, [dispatch]);

    return null; // or return any JSX if needed
};

export { WebNotificationHandler, handleRequestWebPermission };