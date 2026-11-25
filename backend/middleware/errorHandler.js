/**
 * errorHandler.js — Central Error-Handling Middleware
 *
 * What it does:
 *   Catches any errors that happen in route handlers and sends a
 *   consistent JSON error response.
 *
 * Why it exists:
 *   Without this, unhandled errors would crash the server or send
 *   ugly HTML error pages. This middleware ensures every error
 *   returns a clean JSON response with an appropriate status code.
 *
 * How it works:
 *   Express recognises this as an error handler because it has 4 parameters
 *   (err, req, res, next). When any controller calls next(error), Express
 *   skips normal middleware and jumps here.
 */

const errorHandler = (err, req, res, next) => {
  console.error(`Error: ${err.message}`);

  // Mongoose bad ObjectId (e.g., user passes "abc" as a MongoDB _id)
  if (err.name === 'CastError') {
    return res.status(400).json({
      success: false,
      message: 'Invalid ID format',
    });
  }

  // Mongoose validation error (e.g., required field missing)
  if (err.name === 'ValidationError') {
    return res.status(400).json({
      success: false,
      message: err.message,
    });
  }

  // Default: Internal server error
  res.status(err.status || 500).json({
    success: false,
    message: err.message || 'Internal server error',
  });
};

module.exports = errorHandler;
