
# README

This repository contains code for a simple authentication system built using Node.js, Express.js, MongoDB, React.js, and Tailwind CSS. It allows users to sign up, log in, view their profile, update their profile info, and log out.

## Installation Instructions

### Manual Setup

1. **Install Dependencies**:
    - In the root directory:
      ```sh
      npm install
      ```
    - In the `/backend` directory:
      ```sh
      cd backend
      npm install
      cd ..
      ```
    - In the `/frontend` directory:
      ```sh
      cd frontend
      npm install
      cd ..
      ```

2. **Start the Application**:
    - From the root directory:
      ```sh
      npm start
      ```

This will start both the backend and frontend concurrently, launching the app.

### Windows Users (Alternative Method)

If you are on a Windows machine, you can simplify the installation and startup process by using the provided batch file:

1. Open your terminal in the root directory of the project.
2. Run the batch file:
    ```sh
    .\winInstall.bat
    ```

This will automatically install the dependencies for the root, backend, and frontend directories, and then start the application.

## Backend

The backend of this application is built using Node.js and Express.js. It provides API endpoints for user authentication and management. Here's a breakdown of the backend code:

### Dependencies

- `express`: Web framework for Node.js
- `mongoose`: MongoDB object modeling tool
- `cors`: Middleware for enabling Cross-Origin Resource Sharing
- `bcrypt`: Library for hashing passwords
- `jsonwebtoken`: Library for generating and verifying JSON Web Tokens

### Middleware

- `authMiddleware`: Middleware to verify JWT tokens for protected routes

### Routes

- `userRoutes`: Routes for user authentication and management

### Environment Variables

Environment variables are included in the package to connect to a free Atlas MongoDB database. The `.env` file is pre-configured for this setup.

## Frontend

The frontend of this application is built using React.js and styled using Tailwind CSS. It provides a user interface for signing up, logging in, and accessing user-related functionalities. Here's a breakdown of the frontend code:

### Components

- `Navbar`: Navigation bar component
- `Signup`: Component for user signup
- `Login`: Component for user login
- `Profile`: Component for user profile
- `Dashboard`: Component for displaying user dashboard
- `Home`: Component for the home page

### Context

- `AuthContext`: Context for managing user authentication state
- `AuthProvider`: Provider component for the authentication context

### Routing

- `react-router-dom`: Library for declarative routing

### Tailwind CSS

Tailwind CSS is used for styling the frontend components. It is configured through a Tailwind configuration file `tailwind.config.js`, which includes custom color extensions.

## API Endpoints

- `POST /api/users/signup`: Sign up a new user
- `POST /api/users/login`: Log in an existing user
- `GET /api/users`: Get all users (protected route)
- `DELETE /api/users/:userId`: Delete a user (protected route)

## Middleware

### `authMiddleware`

Middleware to verify JWT tokens for protected routes.

## Utilities

### `bcrypt`

Library for hashing passwords.

### `jsonwebtoken`

Library for generating and verifying JSON Web Tokens.

### `userCleanup.js`

The `userCleanup.js` script is not necessary for the main features of this app. However, it demonstrates automated database cleanup possibilities by removing users who were created more than one hour ago. This can be useful for managing temporary users or testing data without manual intervention.

Feel free to reach out for any further assistance or inquiries.
