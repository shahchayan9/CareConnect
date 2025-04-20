import React, { useEffect } from 'react';
import { useAuth0 } from '@auth0/auth0-react';
import api from '../services/api';

export function AuthProvider({ children }) {
  const { getAccessTokenSilently } = useAuth0();

  useEffect(() => {
    // Initialize the API service with the getAccessTokenSilently function
    api.initializeAuth(getAccessTokenSilently);
  }, [getAccessTokenSilently]);

  return children;
}

export default AuthProvider; 