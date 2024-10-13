import React from 'react';
import ReactDOM from 'react-dom/client';

import App from './App';  // Your main App component
import './index.css';  // Global styles

// Create the root element and render the React app
ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
      <App />
  </React.StrictMode>
);
