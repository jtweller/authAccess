import React, { createContext, useState } from 'react';

// Create a context for authentication
const AuthContext = createContext();

// AuthProvider component to provide authentication state to the app
const AuthProvider = ({ children }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false); // State to track login status

  return (
    <AuthContext.Provider value={{ isLoggedIn, setIsLoggedIn }}>
      {children}
    </AuthContext.Provider>
  );
};

export { AuthContext, AuthProvider };



