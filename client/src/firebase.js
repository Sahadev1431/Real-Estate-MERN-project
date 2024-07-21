// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: "real-estate-21a0a.firebaseapp.com",
  projectId: "real-estate-21a0a",
  storageBucket: "real-estate-21a0a.appspot.com",
  messagingSenderId: "518628756878",
  appId: "1:518628756878:web:d9a238d2a6a21507b2a8df"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);