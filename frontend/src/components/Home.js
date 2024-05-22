import React from 'react';

const Home = () => {
  return (
    <div className="container mx-auto">
      <h1 className="text-center text-3xl font-bold my-8">
        Welcome to Authenticated Access: My Secure User Management Showcase
      </h1>
      <div className="flex flex-col md:flex-row justify-center md:justify-between bg-lightgrey p-4 md:p-8">
        <div className="max-w-md mx-auto md:mr-4 mb-8 md:mb-0 bg-lightgrey">
          <h2 className="text-center text-xl font-semibold mb-4">Overview</h2>
          <p className="text-justify p-4">
            This app exemplifies the seamless integration of modern technologies to create a robust user authentication and management system. This project showcases my proficiency in utilizing React, MongoDB, bcrypt, jsonwebtoken, and Tailwind CSS to develop a secure and user-friendly application for managing user authentication.
          </p>
        </div>
        <div className="max-w-md mx-auto md:ml-4 bg-lightgrey">
          <h2 className="text-center text-xl font-semibold mb-4">Technologies</h2>
          <ul className="list-disc p-4">
            <li>React: As the foundation of this app...</li>
            <li>MongoDB: MongoDB serves as the backend database for this app...</li>
            <li>bcrypt: Security is paramount in this app...</li>
            <li>jsonwebtoken: This app utilizes jsonwebtoken for generating and validating authentication tokens...</li>
            <li>Tailwind CSS: Tailwind CSS elevates the visual aesthetics of this app...</li>
          </ul>
        </div>
      </div>
      <div className="mt-8 bg-lightgrey p-4">
        <h2 className="text-center text-xl font-semibold mb-4">Developer Tools Features</h2>
        <p className="text-justify p-4">
          To streamline the development process and enhance productivity, this project integrates several powerful developer tools. Comments in the code provide detailed explanations of each feature.
        </p>
        <ul className="list-disc p-4">
          <li>
            <strong>Concurrently:</strong> Enables simultaneous running of multiple commands, such as starting the React development server and the backend server concurrently, improving efficiency and reducing setup time.
          </li>
          <li>
            <strong>tasks.json:</strong> Utilized for configuring tasks in VS Code, it automates various development workflows, including building the project, running tests, and deploying the application, thus simplifying complex tasks into single commands.
          </li>
        </ul>
      </div>
      <div className="mt-8 bg-lightgrey p-4">
        <h2 className="text-center text-xl font-semibold mb-4">Advantages of Combined Usage</h2>
        <ul className="list-disc inline-block text-left p-4 md:p-8 lg:p-12 girl">
          <li>Enhanced Security: By combining bcrypt for password hashing and jsonwebtoken for authentication tokens...</li>
          <li>Scalability and Flexibility: With MongoDB as the backend database...</li>
          <li>Efficient Development: Tailwind CSS streamlines UI development...</li>
          <li>Optimized User Experience: The combination of React's dynamic rendering capabilities...</li>
        </ul>
      </div>
    </div>
  );
};

export default Home;





