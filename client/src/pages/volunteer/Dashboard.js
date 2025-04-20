import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { 
  FaCalendarAlt, FaClock, FaMapMarkerAlt, FaGraduationCap,
  FaChartLine, FaUserCircle, FaBell, FaCheckCircle
} from 'react-icons/fa';
import api from '../../services/api';
import { useUser } from '../../contexts/UserContext';

// Mock data for development
const mockDashboardData = {
  stats: {
    hoursLogged: 156,
    eventsAttended: 45,
    trainingsCompleted: 8,
    impactedLives: 120
  },
  upcomingEvents: [
    {
      id: 1,
      title: 'Crisis Support Hotline',
      type: 'Support',
      date: '2024-03-25',
      startTime: '2:00 PM',
      endTime: '6:00 PM',
      location: 'Remote',
      status: 'confirmed'
    },
    {
      id: 2,
      title: 'Family Support Group',
      type: 'Group',
      date: '2024-03-28',
      startTime: '6:00 PM',
      endTime: '8:00 PM',
      location: 'NAMI Yolo Office',
      status: 'pending'
    }
  ],
  ongoingTrainings: [
    {
      id: 1,
      title: 'Crisis Intervention Advanced',
      progress: 60,
      dueDate: '2024-04-15',
      nextSession: '2024-03-20'
    },
    {
      id: 2,
      title: 'Peer Support Refresher',
      progress: 30,
      dueDate: '2024-04-30',
      nextSession: '2024-03-22'
    }
  ],
  recentActivity: [
    {
      id: 1,
      type: 'event_completed',
      title: 'Community Outreach Event',
      date: '2024-03-10',
      details: 'Logged 4 hours of community service'
    },
    {
      id: 2,
      type: 'training_milestone',
      title: 'Mental Health First Aid',
      date: '2024-03-08',
      details: 'Completed certification'
    },
    {
      id: 3,
      type: 'feedback_received',
      title: 'Crisis Support Shift',
      date: '2024-03-05',
      details: 'Received positive feedback from coordinator'
    }
  ],
  notifications: [
    {
      id: 1,
      type: 'reminder',
      message: 'Upcoming training session tomorrow at 2 PM',
      date: '2024-03-19'
    },
    {
      id: 2,
      type: 'alert',
      message: 'New volunteer opportunity available: Youth Support Group',
      date: '2024-03-18'
    },
    {
      id: 3,
      type: 'update',
      message: 'Your recent training certificate has been issued',
      date: '2024-03-15'
    }
  ]
};

function Dashboard() {
  const { userData } = useUser();
  const [dashboardData, setDashboardData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchDashboardData = async () => {
      try {
        setLoading(true);
        // Simulate API delay
        await new Promise(resolve => setTimeout(resolve, 1000));
        setDashboardData(mockDashboardData);
        setError(null);
      } catch (err) {
        console.error('Error fetching dashboard data:', err);
        setError('Failed to load dashboard data');
      } finally {
        setLoading(false);
      }
    };

    fetchDashboardData();
  }, []);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500"></div>
      </div>
    );
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
        <h1 className="text-2xl font-bold text-gray-900">
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
        <div className="bg-white rounded-lg shadow p-6">
          <div className="flex items-center">
            <div className="flex-shrink-0 bg-blue-100 rounded-md p-3">
              <FaClock className="h-6 w-6 text-blue-600" />
            </div>
            <div className="ml-4">
              <h3 className="text-lg font-medium text-gray-900">{dashboardData.stats.hoursLogged}</h3>
              <p className="text-sm text-gray-500">Hours Logged</p>
            </div>
          </div>
        </div>
        <div className="bg-white rounded-lg shadow p-6">
          <div className="flex items-center">
            <div className="flex-shrink-0 bg-green-100 rounded-md p-3">
              <FaCalendarAlt className="h-6 w-6 text-green-600" />
            </div>
            <div className="ml-4">
              <h3 className="text-lg font-medium text-gray-900">{dashboardData.stats.eventsAttended}</h3>
              <p className="text-sm text-gray-500">Events Attended</p>
            </div>
          </div>
        </div>
        <div className="bg-white rounded-lg shadow p-6">
          <div className="flex items-center">
            <div className="flex-shrink-0 bg-purple-100 rounded-md p-3">
              <FaGraduationCap className="h-6 w-6 text-purple-600" />
            </div>
            <div className="ml-4">
              <h3 className="text-lg font-medium text-gray-900">{dashboardData.stats.trainingsCompleted}</h3>
              <p className="text-sm text-gray-500">Trainings Completed</p>
            </div>
          </div>
        </div>
        <div className="bg-white rounded-lg shadow p-6">
          <div className="flex items-center">
            <div className="flex-shrink-0 bg-orange-100 rounded-md p-3">
              <FaUserCircle className="h-6 w-6 text-orange-600" />
            </div>
            <div className="ml-4">
              <h3 className="text-lg font-medium text-gray-900">{dashboardData.stats.impactedLives}</h3>
              <p className="text-sm text-gray-500">Lives Impacted</p>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Left Column - Upcoming Events & Trainings */}
        <div className="lg:col-span-2 space-y-8">
          {/* Upcoming Events */}
          <div className="bg-white rounded-lg shadow">
            <div className="px-6 py-4 border-b border-gray-200 flex justify-between items-center">
              <h2 className="text-lg font-semibold text-gray-900">Upcoming Events</h2>
              <Link 
                to="/volunteer/events"
                className="text-sm font-medium text-blue-600 hover:text-blue-800"
              >
                View All
              </Link>
            </div>
            <div className="p-6">
              <div className="space-y-4">
                {dashboardData.upcomingEvents.map((event) => (
                  <div key={event.id} className="border border-gray-200 rounded-lg p-4">
                    <div className="flex justify-between items-start">
                      <div>
                        <h3 className="text-sm font-medium text-gray-900">{event.title}</h3>
                        <div className="mt-1 text-xs text-gray-500 space-y-1">
                          <div className="flex items-center">
                            <FaCalendarAlt className="h-4 w-4 mr-1" />
                            {new Date(event.date).toLocaleDateString()}
                          </div>
                          <div className="flex items-center">
                            <FaClock className="h-4 w-4 mr-1" />
                            {event.startTime} - {event.endTime}
                          </div>
                          <div className="flex items-center">
                            <FaMapMarkerAlt className="h-4 w-4 mr-1" />
                            {event.location}
                          </div>
                        </div>
                      </div>
                      <span className={`px-2 py-1 text-xs rounded-full ${
                        event.status === 'confirmed' ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800'
                      }`}>
                        {event.status}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Ongoing Trainings */}
          <div className="bg-white rounded-lg shadow">
            <div className="px-6 py-4 border-b border-gray-200 flex justify-between items-center">
              <h2 className="text-lg font-semibold text-gray-900">Ongoing Trainings</h2>
              <Link 
                to="/volunteer/trainings"
                className="text-sm font-medium text-blue-600 hover:text-blue-800"
              >
                View All
              </Link>
            </div>
            <div className="p-6">
              <div className="space-y-6">
                {dashboardData.ongoingTrainings.map((training) => (
                  <div key={training.id} className="border border-gray-200 rounded-lg p-4">
                    <div className="flex justify-between items-start mb-4">
                      <div>
                        <h3 className="text-sm font-medium text-gray-900">{training.title}</h3>
                        <p className="text-xs text-gray-500 mt-1">
                          Next Session: {new Date(training.nextSession).toLocaleDateString()}
                        </p>
                      </div>
                      <span className="text-xs text-gray-500">
                        Due: {new Date(training.dueDate).toLocaleDateString()}
                      </span>
                    </div>
                    <div>
                      <div className="flex justify-between text-xs text-gray-600 mb-1">
                        <span>Progress</span>
                        <span>{training.progress}%</span>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-2">
                        <div 
                          className="bg-blue-600 h-2 rounded-full" 
                          style={{ width: `${training.progress}%` }}
                        ></div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Right Column - Activity & Notifications */}
        <div className="space-y-8">
          {/* Recent Activity */}
          <div className="bg-white rounded-lg shadow">
            <div className="px-6 py-4 border-b border-gray-200">
              <h2 className="text-lg font-semibold text-gray-900">Recent Activity</h2>
            </div>
            <div className="p-6">
              <div className="flow-root">
                <ul className="-mb-8">
                  {dashboardData.recentActivity.map((activity, activityIdx) => (
                    <li key={activity.id}>
                      <div className="relative pb-8">
                        {activityIdx !== dashboardData.recentActivity.length - 1 ? (
                          <span className="absolute top-4 left-4 -ml-px h-full w-0.5 bg-gray-200" aria-hidden="true" />
                        ) : null}
                        <div className="relative flex space-x-3">
                          <div>
                            <span className={`h-8 w-8 rounded-full flex items-center justify-center ring-8 ring-white ${
                              activity.type === 'event_completed' ? 'bg-green-100' :
                              activity.type === 'training_milestone' ? 'bg-blue-100' :
                              'bg-yellow-100'
                            }`}>
                              {activity.type === 'event_completed' ? (
                                <FaCheckCircle className="h-4 w-4 text-green-600" />
                              ) : activity.type === 'training_milestone' ? (
                                <FaGraduationCap className="h-4 w-4 text-blue-600" />
                              ) : (
                                <FaChartLine className="h-4 w-4 text-yellow-600" />
                              )}
                            </span>
                          </div>
                          <div className="min-w-0 flex-1">
                            <div>
                              <p className="text-sm text-gray-500">
                                {activity.title}
                              </p>
                              <p className="mt-0.5 text-xs text-gray-500">
                                {new Date(activity.date).toLocaleDateString()}
                              </p>
                            </div>
                            <div className="mt-2 text-sm text-gray-700">
                              {activity.details}
                            </div>
                          </div>
                        </div>
                      </div>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>

          {/* Notifications */}
          <div className="bg-white rounded-lg shadow">
            <div className="px-6 py-4 border-b border-gray-200">
              <h2 className="text-lg font-semibold text-gray-900">Notifications</h2>
            </div>
            <div className="p-6">
              <div className="space-y-4">
                {dashboardData.notifications.map((notification) => (
                  <div 
                    key={notification.id} 
                    className={`p-4 rounded-lg ${
                      notification.type === 'reminder' ? 'bg-blue-50' :
                      notification.type === 'alert' ? 'bg-yellow-50' :
                      'bg-green-50'
                    }`}
                  >
                    <div className="flex">
                      <div className="flex-shrink-0">
                        <FaBell className={`h-5 w-5 ${
                          notification.type === 'reminder' ? 'text-blue-400' :
                          notification.type === 'alert' ? 'text-yellow-400' :
                          'text-green-400'
                        }`} />
                      </div>
                      <div className="ml-3">
                        <p className={`text-sm ${
                          notification.type === 'reminder' ? 'text-blue-800' :
                          notification.type === 'alert' ? 'text-yellow-800' :
                          'text-green-800'
                        }`}>
                          {notification.message}
                        </p>
                        <p className="mt-1 text-xs text-gray-500">
                          {new Date(notification.date).toLocaleDateString()}
                        </p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Dashboard;
