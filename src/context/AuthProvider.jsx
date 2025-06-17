
import React, { useState, useEffect } from 'react';
import { AuthContext } from './AuthC';
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  onAuthStateChanged,
  GoogleAuthProvider,
  signInWithPopup,
updateProfile,

} from 'firebase/auth';
import { auth } from '../firebase.init';



const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  // Create user
  const createUser = (email, password) => {
    setLoading(true);
    return createUserWithEmailAndPassword(auth, email, password);
  };

  // Login user
  const loginUser = (email, password) => {
    setLoading(true);
    return signInWithEmailAndPassword(auth, email, password);
  };

  // Logout user
const signoutUser = () => {
  setLoading(true);
  return signOut(auth);
};


  // Google Sign-In
  const googleProvider = new GoogleAuthProvider();
  const googleSignin = () => {
    setLoading(true);
    return signInWithPopup(auth, googleProvider);
  };

  // Update user profile
 const updateUserProfile = (name, photoURL) => {
  if (!auth.currentUser) return Promise.reject("No user is logged in");
  return updateProfile(auth.currentUser, {
    displayName: name,
    photoURL: photoURL,
  });
};

  // Observe auth state
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  const userInfo = {
    user,
    loading,
    createUser,
    loginUser,
    signoutUser,
    googleSignin,
   updateUserProfile,
  };

  return (
    <AuthContext.Provider value={userInfo}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;
