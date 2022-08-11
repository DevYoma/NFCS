// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore"
import { getStorage } from "firebase/storage"

const firebaseConfig = {
  apiKey: "AIzaSyDfxB_O2mK1GBnu0wPXgaVTdRUh9vywkLE",
  authDomain: "nfcs-1e729.firebaseapp.com",
  projectId: "nfcs-1e729",
  storageBucket: "nfcs-1e729.appspot.com",
  messagingSenderId: "93473949829",
  appId: "1:93473949829:web:0d4db562e7d77c2fbec1ec",
  measurementId: "G-8FZDBTS0EJ"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
// Initializing auth
export const auth = getAuth();
// Initializing db
export const db = getFirestore(app);
// Initializing Storage
export const storage = getStorage(app);
