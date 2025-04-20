import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { FaCalendarAlt, FaClock, FaMapMarkerAlt, FaComment } from 'react-icons/fa';
import api from '../../services/api';
import { useUser } from '../../contexts/UserContext';
import UpcomingEvents from '../../components/participant/UpcomingEvents';
import ResourceList from '../../components/participant/ResourceList';
import SupportChatbot from '../../components/participant/SupportChatbot';

function ParticipantDashboard() {
  const { userData } = useUser();
  const [upcomingEvents, setUpcomingEvents] = useState([]);
  const [resources, setResources] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchDashboardData = async () => {
      try {
        setLoading(true);
        // Fetch upcoming events
        const eventsResponse = await api.get('/participant/events/upcoming');
        setUpcomingEvents(eventsResponse.data);
        
        // Fetch resources
        const resourcesResponse = await api.get('/participant/resources');
        setResources(resourcesResponse.data);
        
        setError(null);
      } catch (err) {
        console.error('Error fetching participant dashboard data:', err);
        setError('Failed to load dashboard data');
      } finally {
        setLoading(false);
      }
    };

    fetchDashboardData();
  }, []);

  if (loading) {
    return <div className="flex justify-center items-center h-screen">Loading...</div>;
  }

  if (error) {
    return (
      <div className="p-4 bg-red-50 text-red-500 rounded-md">
        Error: {error}
      </div>
    );
  }

  return (
    <div className="px-6 py-8">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-2xl font-bold text-gray-800">
          Welcome, {userData?.firstName || 'Participant'}
        </h1>
        <div className="text-sm text-gray-600">
          {new Date().toLocaleDateString('en-US', { 
            weekday: 'long', 
            year: 'numeric', 
            month: 'long', 
            day: 'numeric' 
          })}
        </div>
      </div>

      {/* Welcome Card */}
      <div className="bg-gradient-to-r from-blue-500 to-indigo-600 rounded-lg shadow-md p-6 mb-8 text-white">
        <h2 className="text-xl font-semibold mb-2">Need Support?</h2>
        <p className="mb-4">
          NAMI Yolo is here to help. You can join upcoming events, access resources, or get immediate support.
        </p>
        <div className="flex space-x-4">
          <Link 
            to="/participant/events"
            className="px-4 py-2 bg-white text-blue-600 rounded-md font-medium text-sm hover:bg-gray-100"
          >
            Browse Events
          </Link>
          <Link 
            to="/participant/support"
            className="px-4 py-2 bg-blue-700 text-white rounded-md font-medium text-sm hover:bg-blue-800"
          >
            Get Support
          </Link>
        </div>
      </div>

      {/* Main Content */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Upcoming Events */}
        <div className="lg:col-span-2">
          <div className="bg-white rounded-lg shadow-md overflow-hidden">
            <div className="px-6 py-4 border-b border-gray-200 flex justify-between items-center">
              <h2 className="text-lg font-semibold">Upcoming Events</h2>
              <Link 
                to="/participant/events"
                className="text-sm font-medium text-blue-600 hover:text-blue-800"
              >
                View All
              </Link>
            </div>
            <div className="p-6">
              <UpcomingEvents events={upcomingEvents} />
            </div>
          </div>
        </div>

        {/* Side column */}
        <div className="space-y-8">
          {/* Support Chat */}
          <div className="bg-white rounded-lg shadow-md overflow-hidden">
            <div className="px-6 py-4 border-b border-gray-200">
              <h2 className="text-lg font-semibold">Get Quick Help</h2>
            </div>
            <div className="p-6">
              <SupportChatbot />
            </div>
          </div>
          
          {/* Resources */}
          <div className="bg-white rounded-lg shadow-md overflow-hidden">
            <div className="px-6 py-4 border-b border-gray-200 flex justify-between items-center">
              <h2 className="text-lg font-semibold">Helpful Resources</h2>
              <Link 
                to="/participant/resources"
                className="text-sm font-medium text-blue-600 hover:text-blue-800"
              >
                View All
              </Link>
            </div>
            <div className="p-6">
              <ResourceList resources={resources} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ParticipantDashboard;
