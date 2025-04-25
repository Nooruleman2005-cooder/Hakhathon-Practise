import { initializeApp } from "https://www.gstatic.com/firebasejs/11.3.1/firebase-app.js";
import { getAuth , createUserWithEmailAndPassword ,
    signInWithEmailAndPassword ,
    sendPasswordResetEmail,
    signOut
 } from "https://www.gstatic.com/firebasejs/11.3.1/firebase-auth.js";

const firebaseConfig = {
    apiKey: "AIzaSyAPuBYhfup0AyY59Ox1fsNgAX3D7tZ0uuY",
    authDomain: "authen-9c6b8.firebaseapp.com",
    projectId: "authen-9c6b8",
    storageBucket: "authen-9c6b8.firebasestorage.app",
    messagingSenderId: "1087287583770",
    appId: "1:1087287583770:web:e6867100062a3af0515da3"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

export {auth,createUserWithEmailAndPassword, getAuth , signInWithEmailAndPassword , signOut , sendPasswordResetEmail};