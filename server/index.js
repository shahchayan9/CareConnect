const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const morgan = require('morgan');
const { auth } = require('express-oauth2-jwt-bearer');
const errorHandler = require('./middleware/errorHandler');
const config = require('./config');

// Import routes
const adminRoutes = require('./routes/admin');
const volunteerRoutes = require('./routes/volunteer');
const participantRoutes = require('./routes/participant');
const authRoutes = require('./routes/auth');
const userRoutes = require('./routes/users');

// Create Express app
const app = express();

// Middleware
app.use(cors());
app.use(helmet());
app.use(morgan('dev'));
app.use(express.json());

// Auth0 JWT validation middleware
const jwtCheck = auth({
  audience: config.auth0.audience,
  issuerBaseURL: `https://${config.auth0.domain}`,
  algorithms: ['RS256']
});

// Public routes
app.use('/api/auth', authRoutes);

// Protected routes
app.use('/api/admin', jwtCheck, adminRoutes);
app.use('/api/volunteer', jwtCheck, volunteerRoutes);
app.use('/api/participant', jwtCheck, participantRoutes);
app.use('/api/users', jwtCheck, userRoutes);

// Error handling
app.use(errorHandler);

// Start server
const PORT = process.env.PORT || 5001;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

module.exports = app;