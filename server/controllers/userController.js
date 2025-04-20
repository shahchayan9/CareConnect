const db = require('../db');
const auth0Service = require('../services/auth0Service');

const getUserProfile = async (req, res, next) => {
  try {
    const userId = req.auth.payload.sub;
    
    // Get user profile from database based on Auth0 ID
    const result = await db.query(
      `SELECT * FROM users WHERE auth0_id = $1`,
      [userId]
    );
    
    if (result.rows.length === 0) {
      return res.status(404).json({ message: 'User profile not found' });
    }
    
    res.json(result.rows[0]);
  } catch (error) {
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