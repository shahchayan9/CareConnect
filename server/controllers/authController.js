const auth0Service = require('../services/auth0Service');
const db = require('../db');

const register = async (req, res, next) => {
  try {
    const { email, password, firstName, lastName, role } = req.body;
    
    // Create user in Auth0
    const auth0User = await auth0Service.createUser({
      email,
      password,
      firstName,
      lastName,
      role
    });
    
    // Create user in our database
    await db.query(
      `INSERT INTO users
       (auth0_id, first_name, last_name, email, role, created_at, updated_at)
       VALUES ($1, $2, $3, $4, $5, NOW(), NOW())`,
      [auth0User.user_id, firstName, lastName, email, role]
    );
    
    // Depending on role, create appropriate record
    if (role === 'volunteer') {
      await db.query(
        `INSERT INTO volunteers
         (auth0_id, name, email, status, created_at, updated_at)
         VALUES ($1, $2, $3, 'pending', NOW(), NOW())`,
        [auth0User.user_id, `${firstName} ${lastName}`, email]
      );
    } else if (role === 'participant') {
      await db.query(
        `INSERT INTO participants
         (auth0_id, name, email, created_at, updated_at)
         VALUES ($1, $2, $3, NOW(), NOW())`,
        [auth0User.user_id, `${firstName} ${lastName}`, email]
      );
    }
    
    res.status(201).json({
      message: 'User registered successfully',
      userId: auth0User.user_id
    });
  } catch (error) {
    next(error);
  }
};

const login = async (req, res, next) => {
  try {
    const { email, password } = req.body;
    
    // Authenticate user with Auth0
    const authResponse = await auth0Service.login(email, password);
    
    res.json(authResponse);
  } catch (error) {
    next(error);
  }
};

const refreshToken = async (req, res, next) => {
  try {
    const { refreshToken } = req.body;
    
    // Refresh token with Auth0
    const tokenResponse = await auth0Service.refreshToken(refreshToken);
    
    res.json(tokenResponse);
  } catch (error) {
    next(error);
  }
};

module.exports = {
  register,
  login,
  refreshToken
};