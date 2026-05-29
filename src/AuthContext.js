import React, { createContext, useState, useEffect, useContext } from 'react';
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut, onAuthStateChanged } from 'firebase/auth';
import { getDatabase, ref, set, get } from 'firebase/database';
import { initializeApp } from 'firebase/app';

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

let app;
let auth;
let db;

try {
  app = initializeApp(firebaseConfig);
  auth = getAuth(app);
  db = getDatabase(app);
} catch (error) {
  // App already initialized
  app = initializeApp(firebaseConfig);
  auth = getAuth(app);
  db = getDatabase(app);
}
const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [use