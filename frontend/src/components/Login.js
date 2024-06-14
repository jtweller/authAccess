import React, { useContext, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom'; // Import useNavigate
import { AuthContext } from '../AuthContext';

// Login component for user authentication
const Login = () => {
  const navigate = useNavigate(); // Initialize useNavigate hook for navigation
  const { setIsLoggedIn } = useContext(AuthContext); // Access authentication context
  const [email, setEmail] = useState(''); // State to manage email input
  const [password, setPassword] = useState(''); // State to manage password input

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
      </div>
    </div>
  );
};

export default Login;





