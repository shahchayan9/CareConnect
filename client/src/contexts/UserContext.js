import React, { createContext, useContext, useState, useEffect } from 'react';
import { useAuth0 } from '@auth0/auth0-react';
import api from '../services/api';

const UserContext = createContext();

export const UserProvider = ({ children }) => {
  const { isAuthenticated, user, getAccessTokenSilently } = useAuth0();
  const [userData, setUserData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchUserData = async () => {
      if (isAuthenticated && user) {
        try {
          setLoading(true);
          // Get the access token
          const token = await getAccessTokenSilently();
          
          // Set the token on the API client
          api.setAuthToken(token);
          
          // Get user role and profile data from our backend
          const response = await api.get(`/users/profile`);
          
          if (response.data) {
            setUserData(response.data);
          }
          
          setError(null);
        } catch (err) {
          console.error('Error fetching user data:', err);
          setError('Failed to load user data');
        } finally {
          setLoading(false);
        }
      } else {
        setUserData(null);
        setLoading(false);
      }
    };

    fetchUserData();
  }, [isAuthenticated, user, getAccessTokenSilently]);

  const updateUserProfile = async (profileData) => {
    try {
      setLoading(true);
      const response = await api.put('/users/profile', profileData);
      if (response.data) {
        setUserData(prevData => ({
          ...prevData,
          ...response.data
        }));
      }
      return { success: true };
    } catch (err) {
      console.error('Error updating profile:', err);
      setError('Failed to update profile');
      return { success: false, error: err.message };
    } finally {
      setLoading(false);
    }
  };

  const value = {
    userData,
    loading,
    error,
    updateUserProfile,
    // Helper functions to check user role
    isAdmin: userData?.role === 'admin',
    isVolunteer: userData?.role === 'volunteer',
    isParticipant: userData?.role === 'participant',
  };

  return (
    <UserContext.Provider value={value}>
      {children}
    </UserContext.Provider>
  );
};

export const useUser = () => {
  const context = useContext(UserContext);
  if (context === undefined) {
    throw new Error('useUser must be used within a UserProvider');
  }
  return context;
};
