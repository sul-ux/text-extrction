// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyC8DuliLGQvVUnMoYo8DdyI81oaRL0YRy0",
  authDomain: "expense-tracker-faad1.firebaseapp.com",
  projectId: "expense-tracker-faad1",
  storageBucket: "expense-tracker-faad1.firebasestorage.app",
  messagingSenderId: "952919712646",
  appId: "1:952919712646:web:93f195cc529a9af11fc207",
  measurementId: "G-YVCPTHLMR2"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);