// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: "mern-blog-a47a2.firebaseapp.com",
  projectId: "mern-blog-a47a2",
  storageBucket: "mern-blog-a47a2.appspot.com",
  messagingSenderId: "1054718254659",
  appId: "1:1054718254659:web:e620cc6ea190bce917fef6"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);