// Import the functions you need from the SDKs you need
import firebase from 'firebase/compat/app'; // Importa firebase de compatibilidad
import 'firebase/compat/auth'; // Importa el módulo de autenticación de compatibilidad

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: "AIzaSyD05OcIm_k2on6tuYZikvbLF4fYvv_RPyI",
    authDomain: "mermarket-865f7.firebaseapp.com",
    projectId: "mermarket-865f7",
    storageBucket: "mermarket-865f7.appspot.com",
    messagingSenderId: "114024875087",
    appId: "1:114024875087:web:cf9222b3b71a46d377d63a",
    measurementId: "G-9WDQ65SMWX"
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);

export const firebaseAuth = firebase.auth();