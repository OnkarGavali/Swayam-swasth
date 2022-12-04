// Import the functions you need from the SDKs you need

import { getDatabase } from "firebase/database";

import { initializeApp } from "firebase/app";

import { getAuth,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  sendPasswordResetEmail,
  signOut,
  updateProfile,
} from "firebase/auth";
import {
  getFirestore,
  collection,
  addDoc
} from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyDwChL454StZoSAypZnbveq24ayvg5YCjQ",
  authDomain: "mega-project-475de.firebaseapp.com",
  databaseURL: "https://mega-project-475de-default-rtdb.firebaseio.com",
  projectId: "mega-project-475de",
  storageBucket: "mega-project-475de.appspot.com",
  messagingSenderId: "537779729284",
  appId: "1:537779729284:web:1dcbc1168b17d66d03a3d1",
  measurementId: "G-G0K8F5YKN7",
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const dbfirestore = getFirestore(app);
const db = getDatabase(app);

const logInWithEmailAndPassword = async (email, password) => {
  try {
    await signInWithEmailAndPassword(auth, email, password);
  } catch (err) {
    console.error(err);
    alert(err.message);
  }
};


const registerWithEmailAndPassword = async (name, email, password) => {
  try {
    const res = await createUserWithEmailAndPassword(auth, email, password);
    const user = res.user;
    
    await addDoc(collection(dbfirestore, "doctors"), {
      uid: user.uid,
      name,
      type:"doctor",
      email
    });
   
    
    updateProfile(auth.currentUser, {
      displayName: name
    }).then(() => {
      alert("user added")
    }).catch((error) => {
      alert(error.message)
    });
  } catch (err) {
    console.error(err);
    alert(err.message); 
  }
};


const sendPasswordReset = async (email) => {
  try {
    await sendPasswordResetEmail(auth, email);
    alert("Password reset link sent!");
  } catch (err) {
    console.error(err);
    alert(err.message);
  }
};


const logout = () => {
  signOut(auth);
};



export {
  auth,
  app,
  db,
  dbfirestore,
  logInWithEmailAndPassword,
  registerWithEmailAndPassword,
  sendPasswordReset,
  logout,
};