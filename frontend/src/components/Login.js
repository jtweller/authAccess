import React, { useContext, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom'; // Import useNavigate
import { AuthContext } from '../AuthContext';
import Modal from 'react-modal'; // Import Modal

// Set the root element for accessibility
Modal.setAppElement('#root');

// Login component for user authentication
const Login = () => {
  const navigate = useNavigate(); // Initialize useNavigate hook for navigation
  const { setIsLoggedIn } = useContext(AuthContext); // Access authentication context
  const [email, setEmail] = useState(''); // State to manage email input
  const [password, setPassword] = useState(''); // State to manage password input
  const [resetEmail, setResetEmail] = useState(''); // State to manage password reset email input
  const [resetMessage, setResetMessage] = useState(''); // State to manage password reset messages
  const [isModalOpen, setIsModalOpen] = useState(false); // State to manage modal visibility

  // Handle login form submission
  const handleLogin = async () => {
    try {
      const response = await axios.post('http://localhost:8000/api/users/login', { email, password });
      console.log(response.data);
      const token = response.data.token;
      localStorage.setItem('token', token); // Store token in local storage
      console.log('Token from localStorage:', token);
      setIsLoggedIn(true); // Update login status
      navigate('/'); // Navigate to the dashboard route
    } catch (error) {
      alert('Invalid credentials. Please try again.');
    }
  };

// Handle password reset request form submission
const handlePasswordResetRequest = async () => {
  try {
    const response = await axios.post('http://localhost:8000/api/users/password-reset', { email: resetEmail });
    setResetMessage(response.data.message);
    setIsModalOpen(false);
  } catch (error) {
    console.error('Error sending password reset email:', error);
    setResetMessage(error.response?.data?.message || 'Error sending password reset email. Please try again.');
    if (error.response?.status === 404) {
      setIsModalOpen(false);
    }
  }
};

  return (
    <div className="fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
      <div className="w-full max-w-md p-6 bg-thistle rounded-lg shadow-lg border-double border-4 border-silver">
        <h2 className="text-2xl text-vrpurple text-center mb-4">Login Page</h2>
        <input
          className="w-full mb-4 px-3 py-2 border rounded-lg"
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <input
          className="w-full mb-4 px-3 py-2 border rounded-lg"
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <button
          className="w-full bg-medpurple text-brightwhite py-2 px-4 rounded-lg hover:bg-vrpurple transition-colors"
          onClick={handleLogin}
        >
          Login
        </button>
        <div className="text-center mt-4">
          <button
            className="text-blue-500 hover:underline"
            onClick={() => setIsModalOpen(true)}
          >
            Forgot Password?
          </button>
        </div>
        {resetMessage && <p className="text-center text-green-500 mt-4">{resetMessage}</p>}
      </div>

      <Modal
        isOpen={isModalOpen}
        onRequestClose={() => setIsModalOpen(false)}
        className="fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-white rounded-md shadow-md p-6"
        overlayClassName="fixed inset-0 bg-gray-800 bg-opacity-75 flex items-center justify-center"
        contentLabel="Password Reset"
      >
        <div>
          <h2 className="text-xl font-bold mb-4">Reset Password</h2>
          <input
            className="w-full mb-4 px-3 py-2 border rounded-lg"
            type="email"
            placeholder="Enter your email to reset password"
            value={resetEmail}
            onChange={(e) => setResetEmail(e.target.value)}
          />
          <button
            className="w-full bg-blue-500 text-white py-2 px-4 rounded-lg hover:bg-blue-600 transition-colors"
            onClick={handlePasswordResetRequest}
          >
            Send Reset Email
          </button>
          <button
            className="w-full mt-4 bg-gray-400 text-white py-2 px-4 rounded-lg hover:bg-gray-500 transition-colors"
            onClick={() => setIsModalOpen(false)}
          >
            Cancel
          </button>
        </div>
      </Modal>
    </div>
  );
};

export default Login;








