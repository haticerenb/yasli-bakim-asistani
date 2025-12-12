// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getAnalytics } from "firebase/analytics";
import { getFirestore } from "firebase/firestore"; // <-- Veritabanı özelliği
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyAArnjxOFdEAinldWRWbMfUGw2iB4cJDT0",
  authDomain: "yaslibakimasistani.firebaseapp.com",
  projectId: "yaslibakimasistani",
  storageBucket: "yaslibakimasistani.firebasestorage.app",
  messagingSenderId: "506414315734",
  appId: "1:506414315734:web:9175733462839d138bf177",
  measurementId: "G-H2ERHPHP4N"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

export const auth = getAuth(app);
export const db = getFirestore(app);