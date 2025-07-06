import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { FacebookAuthProvider } from "firebase/auth";
import { initializeApp } from "firebase/app";
import { getStorage } from "firebase/storage";   

  // Your web app's Firebase configuration
  const firebaseConfig = {
    apiKey: "AIzaSyCaMVQ04KIkHBbsEAjnjFR9QnTA5TSitFw",
    authDomain: "givers-6d453.firebaseapp.com",
    projectId: "givers-6d453",
    storageBucket: "givers-6d453.appspot.com",
    messagingSenderId: "880082865418",
    appId: "1:880082865418:web:8b4cd1ffe272ed0db47ef3"
  };

// Initialize Firebase
const app = initializeApp(firebaseConfig);

const provider = new FacebookAuthProvider();
const storage  = getStorage(app);   
const auth = getAuth(app);
export {app, auth, provider, storage}

export const db = getFirestore(app);
