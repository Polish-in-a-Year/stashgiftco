import { initializeApp } from 'firebase/app';
import { getDatabase } from 'firebase/database';

const firebaseConfig = {
  apiKey: "AIzaSyBKNhUWSWrAW2O1kWl19WyqVRye4YyEjKE",
  authDomain: "stashgiftco.firebaseapp.com",
  databaseURL: "https://stashgiftco-default-rtdb.firebaseio.com",
  projectId: "stashgiftco",
  storageBucket: "stashgiftco.firebasestorage.app",
  messagingSenderId: "65742832072",
  appId: "1:65742832072:web:91a0bdb709b4a26bc900fd",
  measurementId: "G-PMQD8WLQ71"
};

const app = initializeApp(firebaseConfig);
export const db = getDatabase(app);