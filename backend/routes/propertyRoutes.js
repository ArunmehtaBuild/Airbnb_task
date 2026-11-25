/**
 * propertyRoutes.js — API Route Definitions
 *
 * What it does:
 *   Maps URL paths to controller functions. When Express receives a request,
 *   it checks these routes to decide which controller to call.
 *
 * Why it exists:
 *   Keeps route definitions separate from the logic that handles them.
 *   This makes it easy to see all API endpoints at a glance.
 *
 * Routes:
 *   GET /api/health           → healthCheck
 *   GET /api/properties/search → searchProperties (must be BEFORE :id route)
 *   GET /api/properties/:id    → getProperty
 */

const express = require('express');
const router = express.Router();
const {
  getProperty,
  searchProperties,
  healthCheck,
} = require('../controllers/propertyController');

// Health check endpoint
router.get('/health', healthCheck);

// Search must come BEFORE the :id route, otherwise Express would treat
// "search" as an :id parameter and try to look up a property called "search"
router.get('/properties/search', searchProperties);

// Get a single property by its ID or slug
router.get('/properties/:id', getProperty);

module.exports = router;
