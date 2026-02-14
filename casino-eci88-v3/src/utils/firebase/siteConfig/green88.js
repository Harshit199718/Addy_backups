// public/firebase-messaging-sw.js
importScripts('https://www.gstatic.com/firebasejs/9.6.1/firebase-app-compat.js');
importScripts('https://www.gstatic.com/firebasejs/9.6.1/firebase-messaging-compat.js');

const firebaseConfig = {
    apiKey: "AIzaSyD4YhwXSo_kC8qrW6zNgSznjU4_QrfxRPs",
    authDomain: "eci88-cf43f.firebaseapp.com",
    projectId: "eci88-cf43f",
    storageBucket: "eci88-cf43f.appspot.com",
    messagingSenderId: "684899489550",
    appId: "1:684899489550:web:820900dd16f6ceb71c295f",
    measurementId: "G-2ZBLDM5SFQ",
};

try {
  firebase.initializeApp(firebaseConfig);
} catch (error) {
  console.log("🚀 ~ firebase error:", error)
}
const messaging = firebase.messaging();
// Customize background notification handling here
messaging.onBackgroundMessage((payload) => {
  const notificationTitle = payload.notification.title;
  const notificationOptions = {
    body: payload.notification.body,
  };
  self.registration.showNotification(notificationTitle, notificationOptions);
});