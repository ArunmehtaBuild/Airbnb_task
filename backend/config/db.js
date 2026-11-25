/**
 * db.js — MongoDB Connection Setup
 *
 * What it does:
 *   Connects to MongoDB Atlas using the connection string from .env
 *
 * Why it exists:
 *   Keeps database connection logic in one place, separate from server startup.
 *   If we ever need to change how we connect, we only edit this file.
 *
 * How it works:
 *   - Reads MONGODB_URI from environment variables
 *   - Uses mongoose.connect() to establish the connection
 *   - Logs success or exits the process on failure
 */

const mongoose = require('mongoose');
const dns = require('dns');

// On Windows, Node.js sometimes fails resolving MongoDB SRV records via local ISP DNS.
// Setting reliable DNS servers (Google + Cloudflare) prevents querySrv ECONNREFUSED errors.
try {
  dns.setServers(['8.8.8.8', '1.1.1.1']);
} catch {
  // Fallback to default if setServers is unavailable
}

const connectDB = async () => {
  if (!process.env.MONGODB_URI) {
    console.error('Error: MONGODB_URI is not defined in backend/.env');
    process.exit(1);
  }

  try {
    const conn = await mongoose.connect(process.env.MONGODB_URI);
    console.log(`MongoDB connected: ${conn.connection.host}`);
  } catch (error) {
    console.error(`MongoDB connection error: ${error.message}`);
    process.exit(1); // Stop the server if DB connection fails
  }
};

module.exports = connectDB;
