import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App'; // Import the main App component
import reportWebVitals from './reportWebVitals'; // Import performance reporting

// Rendering the main App component into the root div in index.html
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);

// Optional: measuring performance of the app
reportWebVitals();
