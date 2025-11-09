// firebase/firebase.init.js
// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBLoUi5-yKVhcW7lrOyuI0FPJPzNqXpUQ0",
  authDomain: "freelancer-market-places.firebaseapp.com",
  projectId: "freelancer-market-places",
  storageBucket: "freelancer-market-places.firebasestorage.app",
  messagingSenderId: "57841132355",
  appId: "1:57841132355:web:1c0fc46f3bd78692ec45f6"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);