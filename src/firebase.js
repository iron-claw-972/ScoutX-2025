// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getFirestore } from "firebase/firestore";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCb0LG7rg3VGLmY18De_r0QbWnKIE0Xz48",
  authDomain: "scouting-app-fall-project-2024.firebaseapp.com",
  projectId: "scouting-app-fall-project-2024",
  storageBucket: "scouting-app-fall-project-2024.appspot.com",
  messagingSenderId: "13548209731",
  appId: "1:13548209731:web:4ee948c1767538fb8776f6",
  measurementId: "G-6BJVZZE9SJ"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const firebase = getFirestore(app);

export default firebase; 