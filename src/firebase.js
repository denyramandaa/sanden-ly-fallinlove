// src/firebase.js
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
    apiKey: "AIzaSyDc0yzEE_UAKyeRnMTqbTnWNzjGVL3Zh2Q",
    authDomain: "ds-invitation.firebaseapp.com",
    projectId: "ds-invitation",
    storageBucket: "ds-invitation.firebasestorage.app",
    messagingSenderId: "451552819321",
    appId: "1:451552819321:web:c6347df962f0502fe33ca8",
    measurementId: "G-FRZ1SQKE09"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);
const storage = getStorage(app);

export { auth, db, storage };
