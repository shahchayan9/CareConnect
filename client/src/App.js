import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { Auth0Provider, useAuth0 } from '@auth0/auth0-react';
import { UserProvider } from './contexts/UserContext';
import AuthProvider from './components/AuthProvider';

// Layout Components
import MainLayout from './components/layouts/MainLayout';
import AdminLayout from './components/layouts/AdminLayout';
import VolunteerLayout from './components/layouts/VolunteerLayout';
import ParticipantLayout from './components/layouts/ParticipantLayout';

// Public Pages
import LandingPage from './pages/public/LandingPage';
import AboutPage from './pages/public/AboutPage';
import LoginPage from './pages/public/LoginPage';
import NotFoundPage from './pages/public/NotFoundPage';
import UnauthorizedPage from './pages/public/UnauthorizedPage';

// Admin Pages
import AdminDashboard from './pages/admin/Dashboard';
import ManageVolunteers from './pages/admin/ManageVolunteers';
import ManageTrainings from './pages/admin/ManageTrainings';
import ManageEvents from './pages/admin/ManageEvents';
import VolunteerMap from './pages/admin/VolunteerMap';
import Reports from './pages/admin/Reports';
import Settings from './pages/admin/Settings';

// Volunteer Pages
import VolunteerDashboard from './pages/volunteer/Dashboard';
import VolunteerProfile from './pages/volunteer/Profile';
import VolunteerTrainings from './pages/volunteer/Trainings';
import VolunteerEvents from './pages/volunteer/Events';
import VolunteerFeedback from './pages/volunteer/Feedback';

// Participant Pages
import ParticipantDashboard from './pages/participant/Dashboard';
import ParticipantProfile from './pages/participant/Profile';
import ParticipantEvents from './pages/participant/Events';
import ParticipantFeedback from './pages/participant/Feedback';
import ParticipantSupport from './pages/participant/Support';
import AdminVisuals from './components/admin/Visualizations';

// Auth Guards
const ProtectedRoute = ({ element, requiredRole }) => {
  const { isAuthenticated, isLoading, user } = useAuth0();
  
  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
      </div>
    );
  }
  
  if (!isAuthenticated) {
    return <Navigate to="/login" />;
  }
  
  // Check if user has the required role
  const userRoles = user['https://communitycareacc.com/roles'] || [];
  if (requiredRole && !userRoles.includes(requiredRole)) {
    return <Navigate to="/unauthorized" />;
  }
  
  return element;
};

// Auth0 Test Component
import Auth0Test from './components/Auth0Test';

function App() {
  return (
    <Auth0Provider
      domain={process.env.REACT_APP_AUTH0_DOMAIN}
      clientId={process.env.REACT_APP_AUTH0_CLIENT_ID}
      authorizationParams={{
        redirect_uri: window.location.origin,
        audience: process.env.REACT_APP_AUTH0_AUDIENCE,
        scope: "openid profile email"
      }}
    >
      <AuthProvider>
        <UserProvider>
          <Router>
            <Routes>
              {/* Public Routes */}
              <Route path="/" element={<MainLayout />}>
                <Route index element={<LandingPage />} />
                <Route path="about" element={<AboutPage />} />
                <Route path="login" element={<LoginPage />} />
                <Route path="unauthorized" element={<UnauthorizedPage />} />
                <Route path="auth-test" element={<Auth0Test />} />
              </Route>
              
              {/* Admin Routes */}
              <Route 
                path="/admin" 
                element={
                  <ProtectedRoute 
                    element={<AdminLayout />}
                    requiredRole="admin"
                  />
                }
              >
                <Route index element={<AdminDashboard />} />
                <Route path="volunteers" element={<ManageVolunteers />} />
                <Route path="trainings" element={<ManageTrainings />} />
                <Route path="events" element={<ManageEvents />} />
                <Route path="map" element={<VolunteerMap />} />
                <Route path="reports" element={<Reports />} />
                <Route path="settings" element={<Settings />} />
              </Route>
              
              {/* Volunteer Routes */}
              <Route 
                path="/volunteer" 
                element={
                  <ProtectedRoute 
                    element={<VolunteerLayout />} 
                    requiredRole="Volunteer"
                  />
                }
              >
                <Route index element={<VolunteerDashboard />} />
                <Route path="profile" element={<VolunteerProfile />} />
                <Route path="trainings" element={<VolunteerTrainings />} />
                <Route path="events" element={<VolunteerEvents />} />
                <Route path="feedback" element={<VolunteerFeedback />} />
              </Route>
              
              {/* Participant Routes */}
              <Route 
                path="/participant" 
                element={
                  <ProtectedRoute 
                    element={<ParticipantLayout />} 
                    requiredRole="Participant"
                  />
                }
              >
                <Route index element={<ParticipantDashboard />} />
                <Route path="profile" element={<ParticipantProfile />} />
                <Route path="events" element={<ParticipantEvents />} />
                <Route path="feedback" element={<ParticipantFeedback />} />
                <Route path="support" element={<ParticipantSupport />} />
              </Route>
              <Route path="/admin/analytics" element={<AdminVisuals />} />
              {/* Catch-all route */}
              <Route path="*" element={<NotFoundPage />} />
            </Routes>
          </Router>
        </UserProvider>
      </AuthProvider>
    </Auth0Provider>
  );
}

export default App;