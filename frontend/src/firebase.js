// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";

const firebaseConfig = {
  apiKey: "AIzaSyDzG2qKNQr81aZ1R5E-RUEiBiQE0UvD-5Q",
  authDomain: "majoraudit.firebaseapp.com",
  databaseURL: "https://majoraudit-default-rtdb.firebaseio.com",
  projectId: "majoraudit",
  storageBucket: "majoraudit.appspot.com",
  messagingSenderId: "86576012950",
  appId: "1:86576012950:web:0741ea8799220ec7796cb7",
  measurementId: "G-72S8M8XKQ6"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);