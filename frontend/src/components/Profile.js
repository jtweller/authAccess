import React, { useContext, useState, useEffect } from 'react';
import axios from 'axios';
import { AuthContext } from '../AuthContext';

const Profile = () => {
  const { setIsLoggedIn } = useContext(AuthContext);
  const [userData, setUserData] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchUserProfile = async () => {
      try {
        const token = localStorage.getItem('token');
        if (!token) {
          setIsLoggedIn(false); // Set isLoggedIn to false if token is not found
          return;
        }

        const response = await axios.get('http://localhost:8000/api/users/profile', {
          headers: {
            Authorization: token
          }
        });
        console.log(response)
        setUserData(response.data);
      } catch (error) {
        setError(error.response.data.message);
      }
    };

    fetchUserProfile();

    return () => {
      // Cleanup
    };
  }, [setIsLoggedIn]);

  return (
    <div className="flex justify-center items-start min-h-screen bg-powderblue pt-16">
      <div className="w-full px-4 lg:px-8 max-w-screen-xl mx-auto">
        <div className="p-6 bg-white rounded-lg shadow-lg border-double border-4 border-skyblue">
          <h2 className="text-2xl lg:text-5xl md:text-4xl sm:text-3xl text-skyblue mt-2 text-center">User Profile</h2>
          {error && <p className="text-red-500">{error}</p>}
          {userData && (
            <div className="mt-4">
              <p><strong>Name:</strong> {userData.firstName} {userData.lastName}</p>
              <p><strong>Email:</strong> {userData.email}</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Profile;





