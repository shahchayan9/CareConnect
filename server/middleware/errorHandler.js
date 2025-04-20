function errorHandler(err, req, res, next) {
  console.error('Error:', err.name, err.message);
  if (err.stack) console.error(err.stack);

  // Handle Auth0 errors
  if (err.name === 'UnauthorizedError' || err.name === 'InvalidTokenError') {
    return res.status(401).json({
      error: {
        message: 'Authentication failed',
        details: err.message,
        status: 401,
        timestamp: new Date().toISOString()
      }
    });
  }

  // Handle role-based access errors
  if (err.name === 'ForbiddenError') {
    return res.status(403).json({
      error: {
        message: 'Insufficient permissions',
        details: err.message,
        status: 403,
        timestamp: new Date().toISOString()
      }
    });
  }

  // Handle all other errors
  const statusCode = err.statusCode || 500;
  const message = err.message || 'Internal Server Error';

  res.status(statusCode).json({
    error: {
      message,
      status: statusCode,
      timestamp: new Date().toISOString()
    }
  });
}

module.exports = errorHandler;