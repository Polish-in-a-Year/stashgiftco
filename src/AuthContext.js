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

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getDatabase(app);

const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [userProfile, setUserProfile] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (authUser) => {
      if (authUser) {
        setUser(authUser);
        const userRef = ref(db, `users/${authUser.uid}`);
        const snapshot = await get(userRef);
        if (snapshot.exists()) {
          setUserProfile(snapshot.val());
        }
      } else {
        setUser(null);
        setUserProfile(null);
      }
      setLoading(false);
    });

    return unsubscribe;
  }, []);

  const signUp = async (email, password, roleType, displayName, newsletterOptIn = true) => {
    const userCredential = await createUserWithEmailAndPassword(auth, email, password);
    const uid = userCredential.user.uid;

    const isPrimaryAdmin = email === "Allison@AllisonODell.com";

    const userProfile = {
      uid,
      email,
      displayName,
      roleType,
      roles: isPrimaryAdmin ? ['primary_admin'] : [roleType],
      createdAt: new Date().toISOString(),
newsletterOptIn: newsletterOptIn || true,
      contactInfo: {
        email,
        phone: '',
        address: ''
      }
    };

    await set(ref(db, `users/${uid}`), userProfile);
    setUserProfile(userProfile);
    return userCredential.user;
  };

  const signIn = async (email, password) => {
    const userCredential = await signInWithEmailAndPassword(auth, email, password);
    const uid = userCredential.user.uid;

    const userRef = ref(db, `users/${uid}`);
    const snapshot = await get(userRef);
    if (snapshot.exists()) {
      setUserProfile(snapshot.val());
    }

    return userCredential.user;
  };

  const logOut = async () => {
    await signOut(auth);
    setUser(null);
    setUserProfile(null);
  };

  const updateUserProfile = async (updates) => {
    if (!user) return;
    await set(ref(db, `users/${user.uid}`), { ...userProfile, ...updates });
    setUserProfile({ ...userProfile, ...updates });
  };

  const value = {
    user,
    userProfile,
    loading,
    signUp,
    signIn,
    logOut,
    updateUserProfile,
    isPrimaryAdmin: userProfile?.roles?.includes('primary_admin'),
    isMaker: userProfile?.roles?.includes('maker'),
    isCustomer: userProfile?.roles?.includes('customer')
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  return useContext(AuthContext);
}