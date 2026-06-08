import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

// Your exact keys from the screenshot
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyAUe1rBMOt0kQLuKtHgcCmqqsmv32sedb8",
  authDomain: "algostreak-c136a.firebaseapp.com",
  projectId: "algostreak-c136a",
  storageBucket: "algostreak-c136a.firebasestorage.app",
  messagingSenderId: "811696151043",
  appId: "1:811696151043:web:46ca4de9cba9a4672ccc36",
  measurementId: "G-3MHHCRG8KK"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Export the specific tools we need for the admin panel
export const auth = getAuth(app);
export const db = getFirestore(app);