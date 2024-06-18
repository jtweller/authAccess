import React, { useContext } from 'react';
import { AuthContext, AuthProvider } from './AuthContext'; // Import authentication context and provider
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'; // Import React Router for navigation
import './App.css'; // Import CSS for styling
import Navbar from './components/Navbar'; // Import Navbar component
import Signup from './components/Signup'; // Import Signup component
import Login from './components/Login'; // Import Login component
import PasswordReset from './components/PasswordReset'; // Import PasswordReset component
import Dashboard from './components/Dashboard'; // Import Dashboard component
import Profile from './components/Profile'; // Import Profile component
import Home from './components/Home'; // Import Home component

// Main App component
function App() {
  return (
    <AuthProvider> {/* AuthProvider provides authentication context to the entire app */}
      <AppRouter />
    </AuthProvider>
  );
}

// Router component to manage routes based on authentication status
function AppRouter() {
  const { isLoggedIn } = useContext(AuthContext); // Access the isLoggedIn state from AuthContext

  return (
    <Router>
      <Navbar /> {/* Navbar component will be visible on all pages */}
      <Routes>
        <Route path="/" element={isLoggedIn ? <Dashboard /> : <Home />} /> {/* Conditional rendering based on login status */}
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/reset-password/:token" element={<PasswordReset />} /> {/* Add password reset route */}
      </Routes>
    </Router>
  );
}

export default App;




