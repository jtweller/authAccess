import React from 'react';

const Dashboard = () => {
  return (
    <div className="flex justify-center items-start min-h-screen bg-silver pt-16">
      <div className="w-full px-4 mx-auto">
        <div className="p-6 bg-white rounded-lg shadow-lg border-double border-4 border-vrpurple">
          <h2 className="text-2xl lg:text-5xl md:text-4xl sm:text-3xl text-vrpurple mt-2 text-center">Welcome to your dashboard</h2>
          <p className='text-center'>This user will be valid for one hour, it will then be purged from the database.</p>
          <div className="mt-6">
            <h3 className="text-xl font-semibold text-gray-800 mb-2">Try the following features:</h3>
            <ul className="list-disc pl-6">
              <li className="mb-2">View your profile</li>
              <li className="mb-2">Make changes to your profile</li>
              <li className="mb-2">Logout and Log back in</li>
            </ul>
            <p className="mt-4 text-center text-gray-600">Thank you for testing my app!</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;









