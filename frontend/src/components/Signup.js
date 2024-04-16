import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const Signup = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    password: '',
  });
  const [signupError, setSignupError] = useState(null);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post('http://localhost:8000/api/users/signup', formData);
      
      if (response.status === 201) {
        // Signup successful
        navigate('/dashboard'); // Redirect to dashboard on success
      } else {
        setSignupError('Signup failed. Please try again.');
      }
    } catch (error) {
      setSignupError('An error occurred while signing up. Please try again.');
    }
  };

  return (
    <div className="fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
      <div className="w-full max-w-md p-6 bg-powderblue rounded-lg shadow-lg border-double border-4 border-skyblue">
        <h2 className="text-2xl text-center mb-4">Signup</h2>
        <form onSubmit={handleSubmit}>
          <input className="w-full mb-4 px-3 py-2 border rounded-lg" type="text" name="firstName" value={formData.firstName} onChange={handleChange} placeholder="First Name" required />
          <input className="w-full mb-4 px-3 py-2 border rounded-lg" type="text" name="lastName" value={formData.lastName} onChange={handleChange} placeholder="Last Name" required />
          <input className="w-full mb-4 px-3 py-2 border rounded-lg" type="email" name="email" value={formData.email} onChange={handleChange} placeholder="Email" required />
          <input className="w-full mb-4 px-3 py-2 border rounded-lg" type="password" name="password" value={formData.password} onChange={handleChange} placeholder="Password" required />
          <button className="w-full bg-skyblue text-brightwhite py-2 px-4 rounded-lg hover:bg-steelblue transition-colors" type="submit">Signup</button>
        </form>
        {signupError && <div>{signupError}</div>}
      </div>
    </div>
  );
};

export default Signup;

