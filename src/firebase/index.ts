// Import the functions you need from the SDKs you need
import { initializeApp, getApps } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyDh61cvKnYZ-KcIsREPZd0_n1IkN6tIxlA",
  authDomain: "swasthya-samadhan-app.firebaseapp.com",
  projectId: "swasthya-samadhan-app",
  storageBucket: "swasthya-samadhan-app.appspot.com",
  messagingSenderId: "82985778601",
  appId: "1:82985778601:web:352548bd12606d4877d8b8",
  measurementId: "G-C3C83X5WR9",
};

// Initialize Firebase
let firebase_app =
  getApps().length === 0 ? initializeApp(firebaseConfig) : getApps()[0];

export const db = getFirestore(firebase_app);
export default firebase_app;
