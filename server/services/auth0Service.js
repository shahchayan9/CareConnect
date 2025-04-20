const axios = require('axios');
const config = require('../config');

// Get Auth0 management API token
const getManagementApiToken = async () => {
  try {
    const response = await axios.post(
      `https://${config.auth0.domain}/oauth/token`,
      {
        client_id: config.auth0.clientId,
        client_secret: config.auth0.clientSecret,
        audience: `https://${config.auth0.domain}/api/v2/`,
        grant_type: 'client_credentials'
      },
      {
        headers: { 'Content-Type': 'application/json' }
      }
    );
    
    return response.data.access_token;
  } catch (error) {
    console.error('Error getting Auth0 management API token:', error);
    throw new Error('Error authenticating with Auth0');
  }
};

// Create a new user in Auth0
const createUser = async (userData) => {
  try {
    const token = await getManagementApiToken();
    
    const response = await axios.post(
      `https://${config.auth0.domain}/api/v2/users`,
      {
        email: userData.email,
        password: userData.password,
        connection: 'Username-Password-Authentication',
        user_metadata: {
          firstName: userData.firstName,
          lastName: userData.lastName
        },
        app_metadata: {
          role: userData.role
        }
      },
      {
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        }
      }
    );
    
    // Assign role to user
    await assignRoleToUser(response.data.user_id, userData.role, token);
    
    return response.data;
  } catch (error) {
    console.error('Error creating Auth0 user:', error);
    throw new Error('Error creating user');
  }
};

// Assign role to user in Auth0
const assignRoleToUser = async (userId, role, token) => {
  try {
    // Get role ID from Auth0
    const roleIdMap = {
      admin: config.auth0.roles.admin,
      volunteer: config.auth0.roles.volunteer,
      participant: config.auth0.roles.participant
    };
    
    const roleId = roleIdMap[role];
    
    if (!roleId) {
      throw new Error(`Invalid role: ${role}`);
    }
    
    await axios.post(
      `https://${config.auth0.domain}/api/v2/users/${userId}/roles`,
      {
        roles: [roleId]
      },
      {
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        }
      }
    );
  } catch (error) {
    console.error('Error assigning role to Auth0 user:', error);
    throw new Error('Error assigning role to user');
  }
};

// Get user roles from Auth0
const getUserRoles = async (userId) => {
  try {
    const token = await getManagementApiToken();
    
    const response = await axios.get(
      `https://${config.auth0.domain}/api/v2/users/${userId}/roles`,
      {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      }
    );
    
    return response.data;
  } catch (error) {
    console.error('Error getting Auth0 user roles:', error);
    throw new Error('Error getting user roles');
  }
};

// Authenticate user with Auth0
const login = async (email, password) => {
  try {
    const response = await axios.post(
      `https://${config.auth0.domain}/oauth/token`,
      {
        grant_type: 'password',
        username: email,
        password,
        audience: config.auth0.audience,
        scope: 'openid profile email',
        client_id: config.auth0.clientId,
        client_secret: config.auth0.clientSecret
      },
      {
        headers: { 'Content-Type': 'application/json' }
      }
    );
    
    return response.data;
  } catch (error) {
    console.error('Error authenticating with Auth0:', error);
    throw new Error('Invalid credentials');
  }
};

// Refresh Auth0 token
const refreshToken = async (refreshToken) => {
  try {
    const response = await axios.post(
      `https://${config.auth0.domain}/oauth/token`,
      {
        grant_type: 'refresh_token',
        refresh_token: refreshToken,
        client_id: config.auth0.clientId,
        client_secret: config.auth0.clientSecret
      },
      {
        headers: { 'Content-Type': 'application/json' }
      }
    );
    
    return response.data;
  } catch (error) {
    console.error('Error refreshing Auth0 token:', error);
    throw new Error('Error refreshing token');
  }
};

module.exports = {
  createUser,
  assignRoleToUser,
  getUserRoles,
  login,
  refreshToken
};