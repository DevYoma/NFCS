// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore"
import { getStorage } from "firebase/storage"
import { getMessaging, getToken } from "firebase/messaging";

const firebaseConfig = {
  apiKey: `${process.env.REACT_APP_APIKEY}`,
  // apiKey: `${process.env.REACT_APP_API_KEY}`,
  authDomain: `${process.env.REACT_APP_AUTHDOMAIN}`,
  projectId: `${process.env.REACT_APP_PROJECTID}`,
  storageBucket: `${process.env.REACT_APP_STORAGEBUCKET}`,
  messagingSenderId: `${process.env.REACT_APP_MESSAGINGSENDERID}`,
  appId: `${process.env.REACT_APPID}`,
  measurementId: `${process.env.REACT_APP_MEASUREMENTID}`,
};

// console.log(process.env.REACT_APP_MEASUREMENTID);
// console.log(process.env.REACT_APP_APIKEY);

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
// const analytics = getAnalytics(app);
// Initializing auth
export const auth = getAuth();
// Initializing db
export const db = getFirestore(app);
// Initializing Storage
export const storage = getStorage(app);