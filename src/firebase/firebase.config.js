// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAXZPSRtkn2jd5cv5SVek8GCbA7GcVxhA0",
  authDomain: "task-management-a6d14.firebaseapp.com",
  projectId: "task-management-a6d14",
  storageBucket: "task-management-a6d14.firebasestorage.app",
  messagingSenderId: "578991153983",
  appId: "1:578991153983:web:caa45b5a4ce5cf4532698a"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export default app;