import React, { useContext, useState, useEffect } from 'react';
import axios from 'axios';
import { AuthContext } from '../AuthContext';
import { ProfileUpdateModal, PasswordUpdateModal } from './modals/AppModals';  // Import modal components

// Profile component to display and update user's profile information
const Profile = () => {
  const { setIsLoggedIn } = useContext(AuthContext); // Access authentication context
  const [userData, setUserData] = useState({
    firstName: '',
    lastName: '',
    email: ''
  }); // State to manage user data
  const [passwordData, setPasswordData] = useState({
    currentPassword: '',
    newPassword: ''
  }); // State to manage password data
  const [error, setError] = useState(null); // State to manage error messages
  const [success, setSuccess] = useState(null); // State to manage success messages
  const [isEditable, setIsEditable] = useState(false); // State to manage if profile is editable
  const [isPasswordEditable, setIsPasswordEditable] = useState(false); // State to manage if password is editable
  const [isProfileModalOpen, setIsProfileModalOpen] = useState(false); // State to manage profile modal visibility
  const [isPasswordModalOpen, setIsPasswordModalOpen] = useState(false); // State to manage password modal visibility

  useEffect(() => {
    // Fetch user profile data when the component mounts
    const fetchUserProfile = async () => {
      try {
        const token = localStorage.getItem('token');
        if (!token) {
          setIsLoggedIn(false);
          return;
        }

        const response = await axios.get('http://localhost:8000/api/users/profile', {
          headers: {
            Authorization: `Bearer ${token}`
          }
        });
        setUserData(response.data);
      } catch (error) {
        setError(error.response?.data?.message || 'An error occurred');
      }
    };

    fetchUserProfile();
  }, [setIsLoggedIn]);

  // Handle input changes and update user data state
  const handleChange = (e) => {
    const { name, value } = e.target;
    setUserData((prevData) => ({
      ...prevData,
      [name]: value
    }));
  };

  // Handle password input changes and update password data state
  const handlePasswordChange = (e) => {
    const { name, value } = e.target;
    setPasswordData((prevData) => ({
      ...prevData,
      [name]: value
    }));
  };

  // Handle form submission to update user profile
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem('token');
      const response = await axios.put('http://localhost:8000/api/users/profile', userData, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
      setUserData(response.data);
      setSuccess('Profile updated successfully');
      setIsProfileModalOpen(false);
      setIsEditable(false);
    } catch (error) {
      setError(error.response?.data?.message || 'An error occurred while updating the profile');
    }
  };

  // Handle form submission to update user password
  const handlePasswordSubmit = async (e) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem('token');
      await axios.put('http://localhost:8000/api/users/profile/password', passwordData, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
      setSuccess('Password updated successfully');
      setPasswordData({ currentPassword: '', newPassword: '' });
      setIsPasswordModalOpen(false);
      setIsPasswordEditable(false);
    } catch (error) {
      setError(error.response?.data?.message || 'An error occurred while updating the password');
    }
  };

  return (
    <div className="flex justify-center items-start min-h-screen bg-powderblue pt-16">
      <div className="w-full px-4 lg:px-8 max-w-screen-xl mx-auto">
        <div className="p-6 bg-white rounded-lg shadow-lg border-double border-4 border-skyblue">
          <h2 className="text-2xl lg:text-5xl md:text-4xl sm:text-3xl text-skyblue mt-2 text-center">User Profile</h2>
          {error && <p className="text-red-500">{error}</p>}
          {success && <p className="text-green-500">{success}</p>}
          <form onSubmit={handleSubmit} className="mt-4">
            <div>
              <label>Name:</label>
              <input
                type="text"
                name="firstName"
                value={userData.firstName}
                onChange={handleChange}
                className="block w-full"
                disabled={!isEditable}
              />
            </div>
            <div>
              <label>Last Name:</label>
              <input
                type="text"
                name="lastName"
                value={userData.lastName}
                onChange={handleChange}
                className="block w-full"
                disabled={!isEditable}
              />
            </div>
            <div>
              <label>Email:</label>
              <input
                type="email"
                name="email"
                value={userData.email}
                onChange={handleChange}
                className="block w-full"
                disabled={!isEditable}
              />
            </div>
            {!isEditable ? (
              <>
                <button type="button" onClick={() => setIsEditable(true)} className="mt-4 bg-blue-500 text-white px-4 py-2 rounded">Update Profile</button>
                <p className="text-gray-500 mt-2">Fields are uneditable until "Update Profile" is clicked.</p>
              </>
            ) : (
              <>
                <div className="flex">
                  <button type="button" onClick={() => setIsProfileModalOpen(true)} className="mt-4 bg-green-500 text-white px-4 py-2 rounded mr-2">Save</button>
                  <button type="button" onClick={() => setIsEditable(false)} className="mt-4 bg-gray-500 text-white px-4 py-2 rounded">Cancel</button>
                </div>
                <p className="text-gray-500 mt-2">Fields are now editable. You can save or cancel your changes.</p>
              </>
            )}
          </form>
          <form onSubmit={handlePasswordSubmit} className="mt-8">
            <h3 className="text-xl font-semibold mb-4">Update Password</h3>
            <div>
              <label>Current Password:</label>
              <input
                type="password"
                name="currentPassword"
                value={passwordData.currentPassword}
                onChange={handlePasswordChange}
                className="block w-full"
                disabled={!isPasswordEditable}
              />
            </div>
            <div>
              <label>New Password:</label>
              <input
                type="password"
                name="newPassword"
                value={passwordData.newPassword}
                onChange={handlePasswordChange}
                className="block w-full"
                disabled={!isPasswordEditable}
              />
            </div>
            {!isPasswordEditable ? (
              <button type="button" onClick={() => setIsPasswordEditable(true)} className="mt-4 bg-blue-500 text-white px-4 py-2 rounded">Update Password</button>
            ) : (
              <div className="flex">
                <button type="button" onClick={() => setIsPasswordModalOpen(true)} className="mt-4 bg-green-500 text-white px-4 py-2 rounded mr-2">Save</button>
                <button type="button" onClick={() => setIsPasswordEditable(false)} className="mt-4 bg-gray-500 text-white px-4 py-2 rounded">Cancel</button>
              </div>
            )}
          </form>
        </div>
      </div>

      <ProfileUpdateModal
        isOpen={isProfileModalOpen}
        onRequestClose={() => setIsProfileModalOpen(false)}
        onConfirmUpdate={handleSubmit}
      />

      <PasswordUpdateModal
        isOpen={isPasswordModalOpen}
        onRequestClose={() => setIsPasswordModalOpen(false)}
        onConfirmUpdate={handlePasswordSubmit}
      />
    </div>
  );
};

export default Profile;














