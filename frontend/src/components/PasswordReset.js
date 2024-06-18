import React, { useState } from 'react';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom'; // Import useParams and useNavigate

const PasswordReset = () => {
  const { token } = useParams(); // Get token from URL
  const navigate = useNavigate(); // Initialize useNavigate hook for navigation
  const [newPassword, setNewPassword] = useState(''); // State to manage new password input
  const [confirmPassword, setConfirmPassword] = useState(''); // State to manage confirm password input
  const [error, setError] = useState(''); // State to manage error messages
  const [success, setSuccess] = useState(''); // State to manage success messages

  // Handle password reset form submission
  const handlePasswordReset = async () => {
    if (newPassword !== confirmPassword) {
      setError('Passwords do not match');
      return;
    }

    try {
      await axios.put(`http://localhost:8000/api/users/reset-password/${token}`, { newPassword });
      setSuccess('Password reset successful. Redirecting to login page...');
      setTimeout(() => {
        navigate('/login');
      }, 3000);
    } catch (error) {
      setError('Error resetting password. Please try again.');
    }
  };

  return (
    <div className="fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
      <div className="w-full max-w-md p-6 bg-thistle rounded-lg shadow-lg border-double border-4 border-silver">
        <h2 className="text-2xl text-vrpurple text-center mb-4">Reset Password</h2>
        {error && <p className="text-red-500 mb-4">{error}</p>}
        {success && <p className="text-green-500 mb-4">{success}</p>}
        {!success && (
          <>
            <input
              className="w-full mb-4 px-3 py-2 border rounded-lg"
              type="password"
              placeholder="New Password"
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
            />
            <input
              className="w-full mb-4 px-3 py-2 border rounded-lg"
              type="password"
              placeholder="Confirm New Password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
            />
            <button
              className="w-full bg-medpurple text-brightwhite py-2 px-4 rounded-lg hover:bg-vrpurple transition-colors"
              onClick={handlePasswordReset}
            >
              Reset Password
            </button>
          </>
        )}
      </div>
    </div>
  );
};

export default PasswordReset;
