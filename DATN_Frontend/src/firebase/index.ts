import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
    apiKey: "AIzaSyC_m0HKXlcdtzO9zX0HjEyRHtOPfow-W0k",
    authDomain: "my-app-fa32c.firebaseapp.com",
    projectId: "my-app-fa32c",
    storageBucket: "my-app-fa32c.appspot.com",
    messagingSenderId: "506001695564",
    appId: "1:506001695564:web:9e7ba8a63f285c3a5ca5e9",
    measurementId: "G-FLD1DXE507"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);