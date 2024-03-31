import React, { useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { AuthContext } from '../AuthContext';
import LogoutModal from './modals/LogoutModal';
import logo from './logo.png';

const Navbar = () => {
  const { isLoggedIn, setIsLoggedIn } = useContext(AuthContext);
  const navigate = useNavigate(); // Initialize useNavigate

  const handleLogout = () => {
    localStorage.removeItem('token');
    setIsLoggedIn(false);
    navigate('/'); // Navigate to Home when logged out
  };

  return (
    <>
      <nav className="bg-gunmetal flex flex-col lg:flex-row justify-between items-center py-4 px-6">
        <div className="flex items-center space-x-2 lg:space-x-4 lg:w-1/3 lg:justify-center">
          <img src={logo} alt="Logo" className="h-14 mr-2" />
          <div className="text-center lg:text-left">
            <Link to="/" className="text-brightwhite text-xl font-bold">Authenticated Access</Link>
            <h5 className="text-sm text-lightgrey mt-1">bcrypt, jsonwebtoken, tailwind CSS</h5>
          </div>
        </div>
        <div className="flex justify-center lg:justify-end lg:w-2/3 space-x-4 mt-4 lg:mt-0">
          {isLoggedIn ? (
            <>
              <Link to="/profile" className="text-tan hover:text-lighttan">
                Profile
              </Link>
              <Link to="/" className="text-tan hover:text-lighttan" onClick={handleLogout}>
                Logout
              </Link>
            </>
          ) : (
            <>
              <Link to="/login" className="text-tan hover:text-lighttan">
                Login
              </Link>
              <Link to="/signup" className="text-tan hover:text-lighttan">
                Signup
              </Link>
              <Link to="/about" className="text-tan hover:text-lighttan">
                About
              </Link>
            </>
          )}
        </div>
      </nav>
      <LogoutModal />
    </>
  );
};

export default Navbar;



