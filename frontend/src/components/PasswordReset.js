import React, { useState } from 'react';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';

const PasswordReset = () => {
  const { token } = useParams(); // Get token from URL params
  const navigate = useNavigate(); // Hook for navigation
  const [newPassword, setNewPassword] = useState(''); // State for new password
  const [confirmPassword, setConfirmPassword] = useState(''); // State for confirm password
  const [error, setError] = useState(''); // State for error messages
  const [success, setSuccess] = useState(''); // State for success messages
  const [passwordError, setPasswordError] = useState(''); // State for password validation error

  // Validate password complexity
  const validatePassword = (password) => {
    if (password.length < 6) {
      return 'Password must be at least 6 characters long.';
    }
    // Add more validation rules as needed (e.g., special characters, numbers)
    return '';
  };

  // Handle password reset form submission
  const handlePasswordReset = async () => {
    // Validate password match
    if (newPassword !== confirmPassword) {
      setError('Passwords do not match');
      return;
    }

    // Validate new password
    const passwordError = validatePassword(newPassword);
    if (passwordError) {
      setPasswordError(passwordError);
      return;
    }

    try {
      // Send password reset request to backend
      await axios.put(`http://localhost:8000/api/users/reset-password/${token}`, { newPassword });

      // Password reset successful
      setSuccess('Password reset successful. Redirecting to login page...');
      setTimeout(() => {
        navigate('/login'); // Redirect to login page after timeout
      }, 3000);
    } catch (error) {
      // Handle error from backend
      setError('Error resetting password. Please try again.');
      console.error('Password reset error:', error);
    }
  };

  return (
    <div className="fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
      <div className="w-full max-w-md p-6 bg-thistle rounded-lg shadow-lg border-double border-4 border-silver">
        <h2 className="text-2xl text-vrpurple text-center mb-4">Reset Password</h2>
        {error && <p className="text-red-500 mb-4">{error}</p>}
        {success && <p className="text-green-500 mb-4">{success}</p>}
        {passwordError && <p className="text-red-500 mb-4">{passwordError}</p>}
        {!success && (
          <>
            <input
              className="w-full mb-4 px-3 py-2 border rounded-lg"
              type="password"
              placeholder="New Password"
              value={newPassword}
              onChange={(e) => {
                setNewPassword(e.target.value);
                setPasswordError('');
              }}
            />
            <input
              className="w-full mb-4 px-3 py-2 border rounded-lg"
              type="password"
              placeholder="Confirm New Password"
              value={confirmPassword}
              onChange={(e) => {
                setConfirmPassword(e.target.value);
                setPasswordError('');
              }}
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


