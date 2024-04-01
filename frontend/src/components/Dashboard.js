import React from 'react';
import logo from './dbg.png'; // Import the logo image

const Dashboard = () => {
  return (
    <div className="flex flex-col justify-start items-center min-h-screen bg-cover bg-center" style={{backgroundImage: `url(${logo})`}}>
      <a href="https://www.vecteezy.com/free-photos/background">Background Stock photos by Vecteezy</a>
      <h2 className="text-2xl lg:text-5xl md:text-4xl sm:text-3xl text-skyblue mt-12">Welcome to your dashboard</h2>
    </div>
  );
};

export default Dashboard;


