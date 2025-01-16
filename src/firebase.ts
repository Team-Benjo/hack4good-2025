// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getFirestore } from "firebase/firestore";
import { collection } from "firebase/firestore";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
export const firebaseConfig = {
  apiKey: "AIzaSyBP9dt_H_4a7rnswmyzbexQu_k2KYi9Nw0",
  authDomain: "hack4good-2025.firebaseapp.com",
  projectId: "hack4good-2025",
  storageBucket: "hack4good-2025.firebasestorage.app",
  messagingSenderId: "452129032865",
  appId: "1:452129032865:web:3fdb2593b5d7b4e82bfee0",
  measurementId: "G-02DJZYZWX2"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const analytics = getAnalytics(app);

export const db = getFirestore(app);

export const usersCollection = collection(db, "users");

export const productsCollection = collection(db, "products");

export const adminsCollection = collection(db, "admins");
