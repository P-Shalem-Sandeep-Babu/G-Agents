import { createContext, useContext, useEffect, useState } from "react";
import { auth } from "../firebase/config";
import {
  registerWithEmail,
  loginWithEmail,
  logout,
  resetPassword,
  loginWithPhone,
  verifyOTP
} from "../firebase/auth";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged(user => {
      setCurrentUser(user);
      setLoading(false);
    });

    return unsubscribe;
  }, []);

  const signup = (email, password) => {
    return registerWithEmail(email, password);
  };

  const login = (email, password) => {
    return loginWithEmail(email, password);
  };

  const phoneLogin = (phoneNumber, appVerifier) => {
    return loginWithPhone(phoneNumber, appVerifier);
  };

  const confirmOTP = (confirmationResult, otp) => {
    return verifyOTP(confirmationResult, otp);
  };

  const passwordReset = (email) => {
    return resetPassword(email);
  };

  const signout = () => {
    return logout();
  };

  const value = {
    currentUser,
    signup,
    login,
    phoneLogin,
    confirmOTP,
    passwordReset,
    signout
  };

  return (
    <AuthContext.Provider value={value}>
      {!loading && children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  return useContext(AuthContext);
};