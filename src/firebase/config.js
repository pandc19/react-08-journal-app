// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore/lite';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyCdoO_XUZNVx_iO2Q_0UCNiYTi6C-8UQwg",
    authDomain: "react-cursos-412f1.firebaseapp.com",
    projectId: "react-cursos-412f1",
    storageBucket: "react-cursos-412f1.appspot.com",
    messagingSenderId: "68984006061",
    appId: "1:68984006061:web:acca4e8fb9ac8d9559ed24"
};

// Initialize Firebase
export const FirebaseApp = initializeApp(firebaseConfig);

export const FirebaseAuth = getAuth(FirebaseApp);

export const FirebaseDB = getFirestore(FirebaseApp);