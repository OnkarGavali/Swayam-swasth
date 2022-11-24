// Import the functions you need from the SDKs you need

import { getDatabase } from "firebase/database";

import { initializeApp } from "firebase/app";

import { getAuth,
signInWithPopup, signInWithEmailAndPassword,
createUserWithEmailAndPassword,
sendPasswordResetEmail,
signOut,
updateProfile,
} from "firebase/auth";
import {
getFirestore,
query,
getDocs,
collection,
where,
addDoc,
setDoc} from "firebase/firestore";

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
  console.log(name,'AA');
  try {
    const res = await createUserWithEmailAndPassword(auth, email, password);
    const user = res.user;
    console.log(user,'AA');
    await addDoc(collection(dbfirestore, "us"), {
      uid: user.uid,
      name,
      authProvider: "local",
      email,
    });
    updateProfile(auth.currentUser, {
      displayName: name
    }).then(() => {
      alert("user added")
    }).catch((error) => {
      alert(error.message)
    });
    console.log(user,'BB');
  } catch (err) {
    console.log(user,'cc');
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