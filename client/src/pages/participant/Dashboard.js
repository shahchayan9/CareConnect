import React, { useState, useEffect } from 'react';
import { FaCalendarAlt, FaClock, FaUserFriends, FaChartLine } from 'react-icons/fa';

// Mock data for development
const mockDashboardData = {
  overview: {
    programsAttended: 12,
    upcomingEvents: 3,
    supportHours: 24,
    progressScore: 85
  },
  upcomingPrograms: [
    {
      id: 1,
      name: 'Wellness Workshop',
      date: '2024-03-25T14:00:00',
      type: 'Workshop',
      location: 'Community Center Room 2',
      facilitator: 'Dr. Emily Chen'
    },
    {
      id: 2,
      name: 'Support Group Session',
      date: '2024-03-27T15:30:00',
      type: 'Group Session',
      location: 'Online (Zoom)',
      facilitator: 'Mark Wilson'
    },
    {
      id: 3,
      name: 'Family Counseling',
      date: '2024-03-29T10:00:00',
      type: 'Individual Session',
      location: 'Office 103',
      facilitator: 'Dr. Sarah Thompson'
    }
  ],
  recentActivities: [
    {
      id: 1,
      type: 'Workshop',
      name: 'Stress Management',
      date: '2024-03-20',
      outcome: 'Completed',
      feedback: 'Very helpful session'
    },
    {
      id: 2,
      type: 'Group Session',
      name: 'Peer Support Group',
      date: '2024-03-18',
      outcome: 'Attended',
      feedback: 'Great discussion'
    },
    {
      id: 3,
      type: 'Individual Session',
      name: 'Progress Review',
      date: '2024-03-15',
      outcome: 'Completed',
      feedback: 'Made good progress'
    }
  ],
  resources: [
    {
      id: 1,
      title: 'Coping Strategies Guide',
      type: 'PDF',
      category: 'Self-Help',
      lastAccessed: '2024-03-19'
    },
    {
      id: 2,
      title: 'Meditation Exercises',
      type: 'Audio',
      category: 'Wellness',
      lastAccessed: '2024-03-17'
    },
    {
      id: 3,
      title: 'Community Support Directory',
      type: 'Link',
      category: 'Resources',
      lastAccessed: '2024-03-15'
    }
  ]
};

function ParticipantDashboard() {
  const [dashboardData, setDashboardData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchDashboardData = async () => {
      try {
        setLoading(true);
        // Simulate API call
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
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <h1 className="text-2xl font-bold text-gray-900 mb-8">Welcome Back!</h1>

      {/* Overview Stats */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <div className="bg-white rounded-lg shadow p-6">
          <div className="flex items-center">
            <div className="p-3 rounded-full bg-blue-100 text-blue-600">
              <FaCalendarAlt className="h-6 w-6" />
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-500">Programs Attended</p>
              <p className="text-2xl font-semibold text-gray-900">{dashboardData.overview.programsAttended}</p>
            </div>
          </div>
        </div>
        <div className="bg-white rounded-lg shadow p-6">
          <div className="flex items-center">
            <div className="p-3 rounded-full bg-green-100 text-green-600">
              <FaClock className="h-6 w-6" />
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-500">Support Hours</p>
              <p className="text-2xl font-semibold text-gray-900">{dashboardData.overview.supportHours}</p>
            </div>
          </div>
        </div>
        <div className="bg-white rounded-lg shadow p-6">
          <div className="flex items-center">
            <div className="p-3 rounded-full bg-purple-100 text-purple-600">
              <FaUserFriends className="h-6 w-6" />
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-500">Upcoming Events</p>
              <p className="text-2xl font-semibold text-gray-900">{dashboardData.overview.upcomingEvents}</p>
            </div>
          </div>
        </div>
        <div className="bg-white rounded-lg shadow p-6">
          <div className="flex items-center">
            <div className="p-3 rounded-full bg-yellow-100 text-yellow-600">
              <FaChartLine className="h-6 w-6" />
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-500">Progress Score</p>
              <p className="text-2xl font-semibold text-gray-900">{dashboardData.overview.progressScore}%</p>
            </div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Upcoming Programs */}
        <div className="bg-white rounded-lg shadow">
          <div className="px-6 py-4 border-b border-gray-200">
            <h2 className="text-lg font-semibold text-gray-900">Upcoming Programs</h2>
          </div>
          <div className="p-6">
            <div className="space-y-6">
              {dashboardData.upcomingPrograms.map((program) => (
                <div key={program.id} className="flex items-start space-x-4">
                  <div className="flex-shrink-0">
                    <div className="p-2 rounded-full bg-blue-100 text-blue-600">
                      <FaCalendarAlt className="h-5 w-5" />
                    </div>
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium text-gray-900">{program.name}</p>
                    <p className="text-sm text-gray-500">
                      {new Date(program.date).toLocaleDateString()} at{' '}
                      {new Date(program.date).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                    </p>
                    <p className="text-sm text-gray-500">{program.location}</p>
                    <p className="text-sm text-gray-500">Facilitator: {program.facilitator}</p>
                  </div>
                  <div className="flex-shrink-0">
                    <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                      {program.type}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Recent Activities */}
        <div className="bg-white rounded-lg shadow">
          <div className="px-6 py-4 border-b border-gray-200">
            <h2 className="text-lg font-semibold text-gray-900">Recent Activities</h2>
          </div>
          <div className="p-6">
            <div className="space-y-6">
              {dashboardData.recentActivities.map((activity) => (
                <div key={activity.id} className="flex items-start space-x-4">
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium text-gray-900">{activity.name}</p>
                    <p className="text-sm text-gray-500">{activity.type}</p>
                    <p className="text-sm text-gray-500">{activity.date}</p>
                    <p className="text-sm text-gray-500">{activity.feedback}</p>
                  </div>
                  <div className="flex-shrink-0">
                    <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
                      {activity.outcome}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Resources */}
        <div className="bg-white rounded-lg shadow lg:col-span-2">
          <div className="px-6 py-4 border-b border-gray-200">
            <h2 className="text-lg font-semibold text-gray-900">Available Resources</h2>
          </div>
          <div className="p-6">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {dashboardData.resources.map((resource) => (
                <div key={resource.id} className="bg-gray-50 rounded-lg p-4">
                  <h3 className="text-sm font-medium text-gray-900">{resource.title}</h3>
                  <p className="text-sm text-gray-500 mt-1">Type: {resource.type}</p>
                  <p className="text-sm text-gray-500">Category: {resource.category}</p>
                  <p className="text-xs text-gray-400 mt-2">
                    Last accessed: {resource.lastAccessed}
                  </p>
                  <button className="mt-3 text-sm text-blue-600 hover:text-blue-500">
                    Access Resource
                  </button>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ParticipantDashboard;
