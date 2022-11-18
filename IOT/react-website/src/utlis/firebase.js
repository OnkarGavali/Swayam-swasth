// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDwChL454StZoSAypZnbveq24ayvg5YCjQ",
  authDomain: "mega-project-475de.firebaseapp.com",
  databaseURL: "https://mega-project-475de-default-rtdb.firebaseio.com",
  projectId: "mega-project-475de",
  storageBucket: "mega-project-475de.appspot.com",
  messagingSenderId: "537779729284",
  appId: "1:537779729284:web:1dcbc1168b17d66d03a3d1",
  measurementId: "G-G0K8F5YKN7"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);