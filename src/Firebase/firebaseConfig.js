// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getFirestore } from "firebase/firestore";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDJhr4sMDjiE_54mJ3HVY2fI6c5E7ja8M0",
  authDomain: "personalwebsite-9196a.firebaseapp.com",
  databaseURL: "https://personalwebsite-9196a-default-rtdb.firebaseio.com",
  projectId: "personalwebsite-9196a",
  storageBucket: "personalwebsite-9196a.appspot.com",
  messagingSenderId: "1037511763926",
  appId: "1:1037511763926:web:f2ae0547e80a87e0132677",
  measurementId: "G-1MDRB78FCC"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
export const db = getFirestore(app);

