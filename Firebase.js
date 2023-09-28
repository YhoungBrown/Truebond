// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import {getAuth} from 'firebase/auth'
import {getFirestore} from 'firebase/firestore'
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyAHHvSRY22W9bIhfjnc78Vf4i3KzxYBbhI",
  authDomain: "tinder-clone-9a2ea.firebaseapp.com",
  projectId: "tinder-clone-9a2ea",
  storageBucket: "tinder-clone-9a2ea.appspot.com",
  messagingSenderId: "583816671405",
  appId: "1:583816671405:web:7e780d0515fd6a44511624",
  measurementId: "G-B35K43GMET"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const auth = getAuth();
const db = getFirestore()

export {auth, db}