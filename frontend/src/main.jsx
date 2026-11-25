/**
 * main.jsx — Application Entry Point
 *
 * What it does:
 *   This is the very first JavaScript file that runs. It mounts the
 *   React application into the DOM by attaching App to the #root element
 *   in index.html.
 *
 * Why it exists:
 *   React needs a bridge between its virtual DOM and the actual browser
 *   DOM. createRoot() creates that bridge, and render() starts the app.
 */

import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';
import App from './App.jsx';

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <App />
  </StrictMode>
);
