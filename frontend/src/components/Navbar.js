import React, { useContext, useEffect, useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { AuthContext } from '../AuthContext';
import LogoutModal from './modals/LogoutModal';
import logo from './logo.png';

const Navbar = () => {
  const { isLoggedIn, setIsLoggedIn } = useContext(AuthContext);
  const navigate = useNavigate(); // Initialize useNavigate
  const location = useLocation();
  const [showLogoutModal, setShowLogoutModal] = useState(false);

  useEffect(() => {
    // Check if the user is logged in when the component mounts
    const token = localStorage.getItem('token');
    if (token) {
      setIsLoggedIn(true);
    }
  }, [setIsLoggedIn]);

  const handleLogout = () => {
    localStorage.removeItem('token');
    setIsLoggedIn(false);
    navigate('/'); // Navigate to Home when logged out
    setShowLogoutModal(false); // Close the logout modal
  };

  const openLogoutModal = () => {
    setShowLogoutModal(true);
  };

  const closeLogoutModal = () => {
    setShowLogoutModal(false);
  };

  return (
    <>
      <nav className="bg-gunmetal flex flex-col lg:flex-row justify-between items-center py-4 px-6">
        <div className="flex items-center space-x-2 lg:space-x-4 lg:w-1/3 lg:justify-center">
          <Link to="/" className="flex items-center text-skyblue">
            <img src={logo} alt="Logo" className="h-14 mr-2" />
          </Link>
          <div className="text-center lg:text-left">
            <h2 className="text-skyblue text-xl font-bold">Authenticated Access</h2>
            <h5 className="text-sm text-lightgrey mt-1">bcrypt, jsonwebtoken, tailwind CSS</h5>
          </div>
        </div>
        <div className="flex justify-center lg:justify-end lg:w-2/3 space-x-4 mt-4 lg:mt-0">
          <Link to="/"   className={`text-skyblue hover:text-steelblue ${
            location.pathname === "/" ? "text-white" : ""
            }`} 
            end aria-current="page"
            >
            Home
          </Link>
          {isLoggedIn ? (
            <>
          <Link to="/profile"   className={`text-skyblue hover:text-steelblue ${
            location.pathname === "/profile" ? "text-white" : ""
            }`} 
            end aria-current="page"
            >
            Profile
          </Link>
              <button onClick={openLogoutModal} className="text-skyblue hover:text-steelblue">
                Logout
              </button>
            </>
          ) : (
            <>
             <Link to="/login"   className={`text-skyblue hover:text-steelblue ${
            location.pathname === "/login" ? "text-white" : ""
            }`} 
            end aria-current="page"
            >
            Login
          </Link>
          <Link to="/signup"   className={`text-skyblue hover:text-steelblue ${
            location.pathname === "/signup" ? "text-white" : ""
            }`} 
            end aria-current="page"
            >
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






