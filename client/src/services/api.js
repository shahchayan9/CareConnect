import axios from 'axios';
import { useAuth0 } from '@auth0/auth0-react';

const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:5001/api';

const api = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Create an instance of the Auth0 hook
let getToken = null;

export const initializeAuth = (getAccessTokenSilently) => {
  getToken = getAccessTokenSilently;
};

// Add a request interceptor to include the auth token
api.interceptors.request.use(
  async (config) => {
    if (getToken) {
      try {
        const token = await getToken();
        if (token) {
          config.headers.Authorization = `Bearer ${token}`;
        }
      } catch (error) {
        console.error('Error getting access token:', error);
      }
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Helper method to set the auth token
const setAuthToken = (token) => {
  if (token) {
    localStorage.setItem('auth_token', token);
  } else {
    localStorage.removeItem('auth_token');
  }
};

export default {
  get: api.get,
  post: api.post,
  put: api.put,
  delete: api.delete,
  setAuthToken,
  initializeAuth,
};
