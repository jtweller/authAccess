import React from 'react';
import { Link } from 'react-router-dom';

const Dashboard = () => {
  return (
    <div>
      <h2>User Dashboard</h2>
      <p>Welcome to your dashboard!</p>
      
      <nav>
        <ul>
          <li>
            <Link to="/dashboard/profile">Profile</Link>
          </li>
          <li>
            <Link to="/dashboard/messages">Messages</Link>
          </li>
          <li>
            <Link to="/dashboard/settings">Settings</Link>
          </li>
        </ul>
      </nav>
    </div>
  );
};

export default Dashboard;