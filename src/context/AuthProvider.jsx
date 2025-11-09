// src/context/AuthProvider.jsx
// src/components/layout/AuthProvider.jsx


import {
  createUserWithEmailAndPassword,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  signOut,
  sendPasswordResetEmail,
  updateProfile,
  GoogleAuthProvider,
  signInWithPopup,
  
} from "firebase/auth";

import { AuthContext } from "./AuthContext";
import { useEffect, useState } from "react";
import { auth } from "../../firebase/firebase.init";

const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  
  const createUser = (email, password) => {
    return createUserWithEmailAndPassword(auth, email, password);
  };

 
  const loginUser = (email, password) => {
    return signInWithEmailAndPassword(auth, email, password);
  };

 
  const logOut = () => signOut(auth);

  
  const resetPassword = (email) => sendPasswordResetEmail(auth, email);

  
  const updateUserProfile = (name, photo) => {
    return updateProfile(auth.currentUser, {
      displayName: name,
      photoURL: photo,
    });
  };

 
  const provider = new GoogleAuthProvider();
  const googleLogin = () => signInWithPopup(auth, provider);

  
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
      setLoading(false);
    });
    return () => unsubscribe();
  }, []);

  const authInfo = {
    user,
    loading,
    createUser,
    loginUser,
    logOut,
    resetPassword,
    googleLogin,
    updateUserProfile,
  };

  return (
    <AuthContext.Provider value={authInfo}>{children}</AuthContext.Provider>
  );
};

export default AuthProvider;
