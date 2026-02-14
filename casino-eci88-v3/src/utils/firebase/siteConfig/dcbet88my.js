// public/firebase-messaging-sw.js
importScripts('https://www.gstatic.com/firebasejs/9.6.1/firebase-app-compat.js');
importScripts('https://www.gstatic.com/firebasejs/9.6.1/firebase-messaging-compat.js');

const firebaseConfig = {
    apiKey: "AIzaSyBDnF4fQYrYVXmTV0F2Mr39Sg-6mUSqP_g",
    authDomain: "dc88my.firebaseapp.com",
    projectId: "dc88my",
    storageBucket: "dc88my.appspot.com",
    messagingSenderId: "600951850740",
    appId: "1:600951850740:web:789337c3e04b59a9f1c0a1",
    measurementId: "G-TR2XGTM5MD"
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