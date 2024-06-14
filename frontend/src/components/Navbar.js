import React, { useContext, useEffect, useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { AuthContext } from '../AuthContext';
import { LogoutModal } from './modals/AppModals'; // Import modal component
import logo from './logo.png'; // Import logo image

// Navbar component
const Navbar = () => {
  const { isLoggedIn, setIsLoggedIn } = useContext(AuthContext); // Access authentication context
  const navigate = useNavigate(); // Initialize useNavigate hook for navigation
  const location = useLocation(); // Initialize useLocation hook to get current path
  const [showLogoutModal, setShowLogoutModal] = useState(false); // State to manage logout modal visibility

  useEffect(() => {
    // Check if the user is logged in when the component mounts
    const token = localStorage.getItem('token');
    if (token) {
      setIsLoggedIn(true);
    }
  }, [setIsLoggedIn]);

  // Handle user logout
  const handleLogout = () => {
    localStorage.removeItem('token');
    setIsLoggedIn(false);
    navigate('/'); // Navigate to Home when logged out
    setShowLogoutModal(false); // Close the logout modal
  };

  // Open logout modal
  const openLogoutModal = () => {
    setShowLogoutModal(true);
  };

  // Close logout modal
  const closeLogoutModal = () => {
    setShowLogoutModal(false);
  };

  return (
    <>
      <nav className="bg-gunmetal flex flex-col lg:flex-row justify-between items-center py-4 px-6">
        <div className="flex items-center space-x-2 lg:space-x-4 lg:w-1/3 lg:justify-center">
          <Link to="/" className="flex items-center text-thistle">
            <img src={logo} alt="Logo" className="h-14 mr-2" />
          </Link>
          <div className="text-center lg:text-left">
            <h2 className="text-thistle text-xl font-bold">Authenticated Access</h2>
            <h5 className="text-sm text-lightgrey mt-1">bcrypt, jsonwebtoken, tailwind CSS</h5>
          </div>
        </div>
        <div className="flex justify-center lg:justify-end lg:w-2/3 space-x-4 mt-4 lg:mt-0">
          <Link to="/" className={`text-thistle hover:text-medpurple ${location.pathname === "/" ? "text-white" : ""}`} end aria-current="page">
            Home
          </Link>
          {isLoggedIn ? (
            <>
              <Link to="/profile" className={`text-thistle hover:text-medpurple ${location.pathname === "/profile" ? "text-white" : ""}`} end aria-current="page">
                Profile
              </Link>
              <button onClick={openLogoutModal} className="text-thistle hover:text-medpurple">
                Logout
              </button>
            </>
          ) : (
            <>
              <Link to="/login" className={`text-thistle hover:text-medpurple ${location.pathname === "/login" ? "text-white" : ""}`} end aria-current="page">
                Login
              </Link>
              <Link to="/signup" className={`text-thistle hover:text-medpurple ${location.pathname === "/signup" ? "text-white" : ""}`} end aria-current="page">
                Signup
              </Link>
            </>
          )}
        </div>
      </nav>
      <LogoutModal 
        isOpen={showLogoutModal}
        onRequestClose={closeLogoutModal}
        onConfirmLogout={handleLogout}
      />
    </>
  );
};

export default Navbar;







