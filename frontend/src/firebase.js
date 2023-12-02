// Import the functions you need from the SDKs you need
require('dotenv/config');
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";

const firebaseConfig = {
  apiKey: process.env.API_KEY,
  authDomain: "majoraudit.firebaseapp.com",
  databaseURL: "https://majoraudit-default-rtdb.firebaseio.com",
  projectId: "majoraudit",
  storageBucket: "majoraudit.appspot.com",
  messagingSenderId: process.env.MESSAGING_SENDER_ID,
  appId: process.env.APP_ID,
  measurementId: process.env.MEASUREMENT_ID
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);