const db = require('../db');
const auth0Service = require('../services/auth0Service');

const getUserProfile = async (req, res, next) => {
  try {
    const userId = req.auth.payload.sub;
    const userInfo = req.auth.payload;
    
    // First try to get existing user
    let result = await db.query(
      `SELECT * FROM users WHERE auth0_id = $1`,
      [userId]
    );
    
    // If user doesn't exist, create them
    if (result.rows.length === 0) {
      result = await db.query(
        `INSERT INTO users (
          auth0_id, 
          email, 
          first_name, 
          last_name, 
          created_at, 
          updated_at
        ) VALUES ($1, $2, $3, $4, NOW(), NOW())
        RETURNING *`,
        [
          userId,
          userInfo.email,
          userInfo.given_name || '',
          userInfo.family_name || ''
        ]
      );
    }
    
    // Add roles from Auth0 token to the response
    const userProfile = {
      ...result.rows[0],
      roles: userInfo['https://communitycareacc.com/roles'] || []
    };
    
    res.json(userProfile);
  } catch (error) {
    console.error('Error in getUserProfile:', error);
    next(error);
  }
};

const updateUserProfile = async (req, res, next) => {
  try {
    const userId = req.auth.payload.sub;
    const { firstName, lastName, email, phone, address, city, state, zip, pronouns } = req.body;
    
    // Update user profile in database
    const result = await db.query(
      `UPDATE users
       SET first_name = $1, last_name = $2, email = $3, phone = $4, 
           address = $5, city = $6, state = $7, zip = $8, pronouns = $9, updated_at = NOW()
       WHERE auth0_id = $10
       RETURNING *`,
      [firstName, lastName, email, phone, address, city, state, zip, pronouns, userId]
    );
    
    if (result.rows.length === 0) {
      return res.status(404).json({ message: 'User profile not found' });
    }
    
    res.json(result.rows[0]);
  } catch (error) {
    next(error);
  }
};

const getUserRoles = async (req, res, next) => {
  try {
    const userId = req.auth.payload.sub;
    
    // Get user roles from Auth0
    const roles = await auth0Service.getUserRoles(userId);
    
    res.json(roles);
  } catch (error) {
    next(error);
  }
};

module.exports = {
  getUserProfile,
  updateUserProfile,
  getUserRoles
};