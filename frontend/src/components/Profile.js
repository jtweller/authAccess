import React, { useContext, useState, useEffect } from 'react';
import axios from 'axios';
import { AuthContext } from '../AuthContext';
import { ProfileUpdateModal } from './modals/AppModals';  // Update this line

const Profile = () => {
  const { setIsLoggedIn } = useContext(AuthContext);
  const [userData, setUserData] = useState({
    firstName: '',
    lastName: '',
    email: ''
  });
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);
  const [isEditable, setIsEditable] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
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

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUserData((prevData) => ({
      ...prevData,
      [name]: value
    }));
  };

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
      setIsModalOpen(false);
      setIsEditable(false);
    } catch (error) {
      setError(error.response?.data?.message || 'An error occurred while updating the profile');
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
              <button type="button" onClick={() => setIsEditable(true)} className="mt-4 bg-blue-500 text-white px-4 py-2 rounded">Update Profile</button>
            ) : (
              <div className="flex">
                <button type="button" onClick={() => setIsModalOpen(true)} className="mt-4 bg-green-500 text-white px-4 py-2 rounded mr-2">Save</button>
                <button type="button" onClick={() => setIsEditable(false)} className="mt-4 bg-gray-500 text-white px-4 py-2 rounded">Cancel</button>
              </div>
            )}
          </form>
        </div>
      </div>

      <ProfileUpdateModal
        isOpen={isModalOpen}
        onRequestClose={() => setIsModalOpen(false)}
        onConfirmUpdate={handleSubmit}
      />
    </div>
  );
};

export default Profile;










