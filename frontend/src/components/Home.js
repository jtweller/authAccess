import React from 'react';

// Home component with an overview of the app
const Home = () => {
  return (
    <div className="container mx-auto">
      <h1 className="text-center text-3xl font-bold my-8">
        Authenticated Access: <br /> Secure User Management
      </h1>
      <p className="text-center text-blue-500 text-1xl font-bold">Designed with Student Developers in mind.</p>
      <div className="flex flex-col md:flex-row justify-center md:justify-between bg-lightgrey p-4 md:p-8">
        <div className="max-w-md mx-auto md:mr-4 mb-8 md:mb-0 bg-lightgrey">
          <h2 className="text-center text-xl font-semibold mb-4">Overview</h2>
          <p className="text-justify p-4">
            This app exemplifies the seamless integration of modern technologies to create a robust user authentication and management system. This project utilizes React, MongoDB, bcrypt, jsonwebtoken, and Tailwind CSS to develop a secure and user-friendly application for managing user authentication.
          </p>
        </div>
        <div className="max-w-md mx-auto md:ml-4 bg-lightgrey">
          <h2 className="text-center text-xl font-semibold mb-4">Technologies</h2>
          <ul className="list-disc p-4">
            <li><strong>React:</strong> The foundation of this app, providing a component-based structure.</li>
            <li><strong>MongoDB:</strong> Serves as the backend database for storing user information securely.</li>
            <li><strong>bcrypt:</strong> Ensures security by hashing passwords before storing them.</li>
            <li><strong>jsonwebtoken(JWT):</strong> Utilized for generating and validating authentication tokens to secure routes.</li>
            <li><strong>Tailwind CSS:</strong> Enhances the visual aesthetics and provides utility-first CSS for rapid UI development.</li>
          </ul>
        </div>
      </div>
      <div className="mt-8 bg-lightgrey p-4">
        <h2 className="text-center text-xl font-semibold mb-4">Developer Tools and Features</h2>
        <p className="text-justify p-4">
          This project integrates a few powerful developer tools. While these tools are optional, their use is recommended, and are worth the extra time to familiarize yourself with. Extensive comments are provided throughout the app for each feature, along with debugging log prints in common places to help in finding errors. A `README.md` file with step-by-step instructions for installation is included. Once installed, review the comments throughout the app.
        </p>
        <ul className="list-disc p-4">
          <li>
            <strong>VS Code:</strong> A highly extensible code editor that supports debugging, task running, and version control. Using VS Code enhances the development experience through its wide range of extensions and built-in features.
          </li>
          <li>
            <strong>Concurrently:</strong> Enables simultaneous running of multiple commands, such as starting the React development server and the backend server concurrently, improving efficiency and reducing setup time.
          </li>
          <li>
            <strong>tasks.json:</strong> Utilized for configuring tasks in VS Code, it automates various development workflows, including building the project, running tests, and deploying the application, thus simplifying complex tasks into single commands.
          </li>
          <li>
            <strong>Nodemon:</strong> A utility that monitors for any changes in your source and automatically restarts your server. It significantly speeds up development by removing the need to manually restart the server after each change.
          </li>
          <li>
            <strong>userCleanup.js:</strong> Demonstrates automated database cleanup possibilities by removing users who were created more than one hour ago. This is useful for managing temporary users or testing data without manual intervention.
          </li>
        </ul>
      </div>

      <div className="mt-8 bg-lightgrey p-4">
        <h2 className="text-center text-xl font-semibold mb-4">Advantages of Combined Usage</h2>
        <ul className="list-disc inline-block text-left p-4 md:p-8 lg:p-12 girl">
          <li><strong>Enhanced Security:</strong> By combining bcrypt for password hashing and jsonwebtoken for authentication tokens, the app ensures secure user authentication.</li>
          <li><strong>Scalability and Flexibility:</strong> With MongoDB as the backend database, the app can scale easily and handle large amounts of data.</li>
          <li><strong>Efficient Development:</strong> Tailwind CSS streamlines UI development with utility-first CSS classes, making it easy to design responsive and modern user interfaces.</li>
          <li><strong>Optimized User Experience:</strong> The combination of React's dynamic rendering capabilities and Tailwind CSS's styling features provides a seamless and engaging user experience.</li>
        </ul>
      </div>
    </div>
  );
};

export default Home;








