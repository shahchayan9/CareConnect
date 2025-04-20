import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { FaCalendarAlt, FaGraduationCap, FaClock, FaAward } from 'react-icons/fa';
import api from '../../services/api';
import { useUser } from '../../contexts/UserContext';
import VolunteerStats from '../../components/volunteer/VolunteerStats';
import UpcomingTrainings from '../../components/volunteer/UpcomingTrainings';
import AvailableEvents from '../../components/volunteer/AvailableEvents';
import TrainingProgress from '../../components/volunteer/TrainingProgress';

function VolunteerDashboard() {
  const { userData } = useUser();
  const [stats, setStats] = useState({
    hoursLogged: 0,
    eventsAttended: 0,
    trainingsCompleted: 0,
    nextEvent: null
  });
  const [upcomingTrainings, setUpcomingTrainings] = useState([]);
  const [availableEvents, setAvailableEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchDashboardData = async () => {
      try {
        setLoading(true);
        // Fetch volunteer stats
        const statsResponse = await api.get('/volunteer/dashboard/stats');
        setStats(statsResponse.data);
        
        // Fetch upcoming trainings
        const trainingsResponse = await api.get('/volunteer/trainings/upcoming');
        setUpcomingTrainings(trainingsResponse.data);
        
        // Fetch available events
        const eventsResponse = await api.get('/volunteer/events/available');
        setAvailableEvents(eventsResponse.data);
        
        setError(null);
      } catch (err) {
        console.error('Error fetching volunteer dashboard data:', err);
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
          Welcome back, {userData?.firstName || 'Volunteer'}
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

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <VolunteerStats stats={stats} />
      </div>

      {/* Next Event Card - if one is scheduled */}
      {stats.nextEvent && (
        <div className="bg-white rounded-lg shadow-md p-6 mb-8 border-l-4 border-blue-500">
          <div className="flex items-start justify-between">
            <div>
              <h2 className="text-lg font-semibold text-gray-800">Your Next Event</h2>
              <p className="text-gray-600 mt-1">{stats.nextEvent.title}</p>
              
              <div className="mt-3 flex items-center text-sm text-gray-600">
                <FaCalendarAlt className="mr-2 text-blue-500" />
                {new Date(stats.nextEvent.date).toLocaleDateString('en-US', {
                  weekday: 'long',
                  month: 'long', 
                  day: 'numeric'
                })}
                <span className="mx-2">•</span>
                <FaClock className="mr-2 text-blue-500" />
                {stats.nextEvent.startTime}
              </div>
              
              <div className="mt-2 text-sm text-gray-600">
                {stats.nextEvent.location}
              </div>
            </div>
            
            <Link 
              to={`/volunteer/events/${stats.nextEvent.id}`}
              className="px-4 py-2 bg-blue-500 text-white text-sm font-medium rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              View Details
            </Link>
          </div>
        </div>
      )}

      {/* Main Content */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Training Progress */}
        <div className="lg:col-span-2">
          <div className="bg-white rounded-lg shadow-md overflow-hidden">
            <div className="px-6 py-4 border-b border-gray-200">
              <h2 className="text-lg font-semibold">Your Training Progress</h2>
            </div>
            <div className="p-6">
              <TrainingProgress />
            </div>
          </div>
        </div>

        {/* Side column */}
        <div className="space-y-8">
          {/* Upcoming Trainings */}
          <div className="bg-white rounded-lg shadow-md overflow-hidden">
            <div className="px-6 py-4 border-b border-gray-200 flex justify-between items-center">
              <h2 className="text-lg font-semibold">Upcoming Trainings</h2>
              <Link 
                to="/volunteer/trainings"
                className="text-sm font-medium text-blue-600 hover:text-blue-800"
              >
                View All
              </Link>
            </div>
            <div className="p-6">
              <UpcomingTrainings trainings={upcomingTrainings} />
            </div>
          </div>
          
          {/* Available Events */}
          <div className="bg-white rounded-lg shadow-md overflow-hidden">
            <div className="px-6 py-4 border-b border-gray-200 flex justify-between items-center">
              <h2 className="text-lg font-semibold">Available Events</h2>
              <Link 
                to="/volunteer/events"
                className="text-sm font-medium text-blue-600 hover:text-blue-800"
              >
                View All
              </Link>
            </div>
            <div className="p-6">
              <AvailableEvents events={availableEvents} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default VolunteerDashboard;
