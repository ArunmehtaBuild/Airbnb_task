/**
 * server.js — Express Application Entry Point
 *
 * What it does:
 *   Sets up and starts the Express server. This is the first file that runs
 *   when you start the backend.
 *
 * Why it exists:
 *   Every Express app needs a central file that:
 *   1. Loads environment variables
 *   2. Connects to the database
 *   3. Sets up middleware (CORS, JSON parsing)
 *   4. Registers API routes
 *   5. Adds error handling
 *   6. Starts listening on a port
 *
 * How it communicates:
 *   - Uses config/db.js to connect to MongoDB
 *   - Uses routes/propertyRoutes.js to handle API requests
 *   - Uses middleware/errorHandler.js to catch errors
 */

const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const path = require('path');
const connectDB = require('./config/db');
const propertyRoutes = require('./routes/propertyRoutes');
const errorHandler = require('./middleware/errorHandler');

// Load environment variables from .env file
dotenv.config({ path: path.join(__dirname, '.env') });

// Create the Express app
const app = express();

// --- Middleware ---

// CORS: Allow the React frontend (running on port 5173) to call this API
app.use(cors({
  origin: ['http://localhost:5173', 'http://127.0.0.1:5173'],
}));

// Parse incoming JSON request bodies
app.use(express.json());

// --- Routes ---

// All property-related routes are prefixed with /api
app.use('/api', propertyRoutes);

// --- Error Handling ---

// This must come AFTER all routes. It catches errors from any route handler.
app.use(errorHandler);

// --- Start Server ---

const PORT = process.env.PORT || 5000;

const startServer = async () => {
  // Connect to MongoDB first
  await connectDB();

  app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
  });
};

startServer();
