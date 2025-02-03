import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';
import { getMessaging, getToken, onMessage } from 'firebase/messaging';
import { getAnalytics } from "firebase/analytics";

// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: "AIzaSyBDaZ4G0Oan8BfF-HioQ1mToTcwDcvDA0c",
    authDomain: "projet-habitude.firebaseapp.com",
    projectId: "projet-habitude",
    storageBucket: "projet-habitude.firebasestorage.app",
    messagingSenderId: "902339702480",
    appId: "1:902339702480:web:6a2a65bbdba6812ea2f8d5",
    measurementId: "G-44BSV95TY6"
  };
  

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

// 🔐 Authentification
export const auth = getAuth(app);

// 📂 Firestore (base de données)
export const db = getFirestore(app);

// 🔔 Notifications Push (FCM)
export const messaging = getMessaging(app);

// ⚡ Gérer les notifications en temps réel
onMessage(messaging, (payload) => {
  console.log("Notification reçue en premier plan :", payload);
});
