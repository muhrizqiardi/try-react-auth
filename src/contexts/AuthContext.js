import React, { useContext, useEffect, useState } from "react";
import { auth } from "../firebase"

const AuthContext = React.createContext();

export function useAuth() {
  return useContext(AuthContext);
}

function AuthProvider({ children }) {
  const [currentUser, setCurrentUser] = useState();

  // Signup (anon) function
  const signup = (email, password) => {
    return auth.createUserWithEmailAndPassword(email, password);
  };
  
  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged(user => {
      setCurrentUser(user);
    });
  }, []);

  const value = {
    currentUser,
    signup,
  }

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
}
export { AuthProvider };
