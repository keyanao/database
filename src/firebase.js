// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getFirestore } from 'firebase/firestore';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyAG49NLX92ZSNa2oMI3aZmntYyBEZoqjMQ",
  authDomain: "practice-cd2b3.firebaseapp.com",
  projectId: "practice-cd2b3",
  storageBucket: "practice-cd2b3.appspot.com",
  messagingSenderId: "597369386304",
  appId: "1:597369386304:web:f5dafdcf2f2e35355b76a5",
  measurementId: "G-FRQ1F4MGTT"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
export const db = getFirestore(app);