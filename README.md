# README

This repository contains code for a simple authentication system built using Node.js, Express.js, MongoDB, React.js, and Tailwind CSS. It allows users to sign up, log in, view all users, and delete users.

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

Make sure to set up the following environment variables:

- `MONGODB_URI`: MongoDB connection string
- `JWT_SECRET`: Secret key for JWT token generation

### Running the Backend

To run the backend, follow these steps:

1. Install dependencies: `npm install`
2. Start the server: `npm start`

The server will run on `http://localhost:8000`.

## Frontend

The frontend of this application is built using React.js and styled using Tailwind CSS. It provides a user interface for signing up, logging in, and accessing user-related functionalities. Here's a breakdown of the frontend code:

### Components

- `Navbar`: Navigation bar component
- `Signup`: Component for user signup
- `Login`: Component for user login
- `Dashboard`: Component for displaying user dashboard
- `Home`: Component for the home page

### Context

- `AuthContext`: Context for managing user authentication state
- `AuthProvider`: Provider component for the authentication context

### Routing

- `react-router-dom`: Library for declarative routing

### Tailwind CSS

Tailwind CSS is used for styling the frontend components. It is configured through a Tailwind configuration file `tailwind.config.js`, which includes custom color extensions.

### Running the Frontend

To run the frontend, follow these steps:

1. Install dependencies: `npm install`
2. Start the development server: `npm start`

The frontend will be accessible in the browser at `http://localhost:3000`.

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

## Note

Make sure to set up the environment variables and MongoDB connection string before running the application. Additionally, protect routes that require authentication using the `authMiddleware`.

Feel free to reach out for any further assistance or inquiries.
