import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: process.env.apiKey,
  authDomain: "wheres-waldo-1637e.firebaseapp.com",
  projectId: "wheres-waldo-1637e",
  storageBucket: "wheres-waldo-1637e.appspot.com",
  messagingSenderId: "561736574474",
  appId: "1:561736574474:web:c2c7cd733163ca143d21f3",
  measurementId: "G-NJ6BD21V01",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
