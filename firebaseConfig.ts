// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth"; // getAuth 추가

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDG3VlPV7cSc8XoN6r6fZAhjSpVNGSjtaw",
  authDomain: "langlit-9b177.firebaseapp.com",
  projectId: "langlit-9b177",
  storageBucket: "langlit-9b177.firebasestorage.app",
  messagingSenderId: "409752069423",
  appId: "1:409752069423:web:25f37114872ce4b3f3adda",
  measurementId: "G-09XPZTXMTM"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const auth = getAuth(app); // auth 초기화

// Export the initialized instances
export { app, analytics, auth };