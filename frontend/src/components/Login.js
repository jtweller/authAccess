import React, { useContext, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom'; // Import useNavigate
import { AuthContext } from '../AuthContext';

const Login = () => {
  const navigate = useNavigate(); // Initialize useNavigate
  const { setIsLoggedIn } = useContext(AuthContext);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = async () => {
    try {
      const response = await axios.post('http://localhost:8000/api/users/login', { email, password });
      const token = response.data.token;
      localStorage.setItem('token', token);
      setIsLoggedIn(true); // Update login status
      navigate('/'); // Navigate to the dashboard route
    } catch (error) {
      alert('Invalid credentials. Please try again.');
    }
  };

  return (
    <div>
      <h2>Login Page</h2>
      <input
        type="email"
        placeholder="Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
      <input
        type="password"
        placeholder="Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      <button onClick={handleLogin}>Login</button>
    </div>
  );
};

export default Login;

