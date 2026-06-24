import { initializeApp, getApps, getApp } from "firebase/app";
import { getDatabase } from "firebase/database";

const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY || "AIzaSyAFot5eekPPxBrY3eyoASf0-sVSHQaaEpQ",
  authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN || "project-4984632662548794276.firebaseapp.com",
  databaseURL: import.meta.env.VITE_FIREBASE_DATABASE_URL || "https://project-4984632662548794276-default-rtdb.firebaseio.com",
  projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID || "project-4984632662548794276",
  storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET || "project-4984632662548794276.appspot.com",
  messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID || "515485803165",
  appId: import.meta.env.VITE_FIREBASE_APP_ID || "1:515485803165:web:ba66a02e6afd18220a6a74",
  measurementId: import.meta.env.VITE_FIREBASE_MEASUREMENT_ID || "G-DYJKJPY0RY"
};

// Initialize Firebase
const app = getApps().length === 0 ? initializeApp(firebaseConfig) : getApp();
export const rtdb = getDatabase(app);
