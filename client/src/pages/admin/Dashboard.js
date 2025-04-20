import React, { useState, useEffect } from 'react';
import { 
  FaUsers, FaCalendarCheck, FaGraduationCap, FaChartLine,
  FaMapMarkerAlt, FaClock, FaCheckCircle, FaExclamationTriangle
} from 'react-icons/fa';
import api from '../../services/api';
import { useUser } from '../../contexts/UserContext';

// Mock data for development
const mockDashboardData = {
  stats: {
    totalVolunteers: 156,
    activeTrainings: 8,
    upcomingEvents: 12,
    hoursLogged: 1234
  },
  recentVolunteers: [
    {
      id: 1,
      name: 'Sarah Wilson',
      email: 'sarah.w@example.com',
      role: 'Crisis Support',
      status: 'active',
      joinDate: '2024-03-15',
      completedTrainings: 3
    },
    {
      id: 2,
      name: 'Michael Chen',
      email: 'michael.c@example.com',
      role: 'Peer Support',
      status: 'pending',
      joinDate: '2024-03-14',
      completedTrainings: 1
    },
    {
      id: 3,
      name: 'Emily Rodriguez',
      email: 'emily.r@example.com',
      role: 'Family Support',
      status: 'active',
      joinDate: '2024-03-12',
      completedTrainings: 2
    },
    {
      id: 4,
      name: 'James Thompson',
      email: 'james.t@example.com',
      role: 'Crisis Support',
      status: 'training',
      joinDate: '2024-03-10',
      completedTrainings: 0
    }
  ],
  upcomingEvents: [
    {
      id: 1,
      title: 'Crisis Intervention Training',
      type: 'training',
      date: '2024-03-20',
      time: '9:00 AM - 4:00 PM',
      location: 'Main Office',
      participants: 12,
      maxCapacity: 15
    },
    {
      id: 2,
      title: 'Community Support Group',
      type: 'event',
      date: '2024-03-22',
      time: '6:00 PM - 8:00 PM',
      location: 'Community Center',
      volunteers: 4,
      requiredVolunteers: 5
    },
    {
      id: 3,
      title: 'Family Education Workshop',
      type: 'workshop',
      date: '2024-03-25',
      time: '10:00 AM - 2:00 PM',
      location: 'Library Hall',
      participants: 20,
      maxCapacity: 30
    }
  ],
  volunteerDistribution: [
    { area: 'Davis', count: 45, percentage: 28.8 },
    { area: 'Woodland', count: 38, percentage: 24.4 },
    { area: 'West Sacramento', count: 35, percentage: 22.4 },
    { area: 'Winters', count: 20, percentage: 12.8 },
    { area: 'Other', count: 18, percentage: 11.6 }
  ],
  recentAlerts: [
    {
      id: 1,
      type: 'warning',
      message: 'Crisis Support shift tomorrow needs 1 more volunteer',
      timestamp: '2024-03-16T10:30:00Z'
    },
    {
      id: 2,
      type: 'info',
      message: 'New training materials available for Peer Support program',
      timestamp: '2024-03-16T09:15:00Z'
    },
    {
      id: 3,
      type: 'success',
      message: '5 new volunteers completed orientation this week',
      timestamp: '2024-03-15T16:45:00Z'
    }
  ]
};

function AdminDashboard() {
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
          Welcome back, {userData?.firstName || 'Admin'}
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
              <FaUsers className="h-6 w-6 text-blue-600" />
            </div>
            <div className="ml-4">
              <h3 className="text-lg font-medium text-gray-900">{dashboardData.stats.totalVolunteers}</h3>
              <p className="text-sm text-gray-500">Total Volunteers</p>
            </div>
          </div>
        </div>
        <div className="bg-white rounded-lg shadow p-6">
          <div className="flex items-center">
            <div className="flex-shrink-0 bg-green-100 rounded-md p-3">
              <FaGraduationCap className="h-6 w-6 text-green-600" />
            </div>
            <div className="ml-4">
              <h3 className="text-lg font-medium text-gray-900">{dashboardData.stats.activeTrainings}</h3>
              <p className="text-sm text-gray-500">Active Trainings</p>
            </div>
          </div>
        </div>
        <div className="bg-white rounded-lg shadow p-6">
          <div className="flex items-center">
            <div className="flex-shrink-0 bg-purple-100 rounded-md p-3">
              <FaCalendarCheck className="h-6 w-6 text-purple-600" />
            </div>
            <div className="ml-4">
              <h3 className="text-lg font-medium text-gray-900">{dashboardData.stats.upcomingEvents}</h3>
              <p className="text-sm text-gray-500">Upcoming Events</p>
            </div>
          </div>
        </div>
        <div className="bg-white rounded-lg shadow p-6">
          <div className="flex items-center">
            <div className="flex-shrink-0 bg-orange-100 rounded-md p-3">
              <FaChartLine className="h-6 w-6 text-orange-600" />
            </div>
            <div className="ml-4">
              <h3 className="text-lg font-medium text-gray-900">{dashboardData.stats.hoursLogged}</h3>
              <p className="text-sm text-gray-500">Hours Logged (Month)</p>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Recent Volunteers */}
        <div className="lg:col-span-2">
          <div className="bg-white rounded-lg shadow overflow-hidden">
            <div className="px-6 py-4 border-b border-gray-200">
              <h2 className="text-lg font-semibold text-gray-900">Recent Volunteers</h2>
            </div>
            <div className="p-6">
              <div className="overflow-x-auto">
                <table className="min-w-full divide-y divide-gray-200">
                  <thead>
                    <tr>
                      <th className="px-6 py-3 bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Name
                      </th>
                      <th className="px-6 py-3 bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Role
                      </th>
                      <th className="px-6 py-3 bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Status
                      </th>
                      <th className="px-6 py-3 bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Joined
                      </th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {dashboardData.recentVolunteers.map((volunteer) => (
                      <tr key={volunteer.id}>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="flex items-center">
                            <div className="flex-shrink-0 h-10 w-10">
                              <div className="h-10 w-10 rounded-full bg-gray-200 flex items-center justify-center text-gray-500 text-sm font-medium uppercase">
                                {volunteer.name.charAt(0)}
                              </div>
                            </div>
                            <div className="ml-4">
                              <div className="text-sm font-medium text-gray-900">{volunteer.name}</div>
                              <div className="text-sm text-gray-500">{volunteer.email}</div>
                            </div>
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="text-sm text-gray-900">{volunteer.role}</div>
                          <div className="text-sm text-gray-500">{volunteer.completedTrainings} trainings</div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <span className={`px-2 py-1 inline-flex text-xs leading-5 font-semibold rounded-full ${
                            volunteer.status === 'active' ? 'bg-green-100 text-green-800' :
                            volunteer.status === 'pending' ? 'bg-yellow-100 text-yellow-800' :
                            'bg-gray-100 text-gray-800'
                          }`}>
                            {volunteer.status}
                          </span>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                          {new Date(volunteer.joinDate).toLocaleDateString()}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>

        {/* Side Column */}
        <div className="space-y-8">
          {/* Alerts */}
          <div className="bg-white rounded-lg shadow overflow-hidden">
            <div className="px-6 py-4 border-b border-gray-200">
              <h2 className="text-lg font-semibold text-gray-900">Recent Alerts</h2>
            </div>
            <div className="p-6">
              <div className="space-y-4">
                {dashboardData.recentAlerts.map((alert) => (
                  <div 
                    key={alert.id} 
                    className={`p-4 rounded-lg ${
                      alert.type === 'warning' ? 'bg-yellow-50' :
                      alert.type === 'success' ? 'bg-green-50' :
                      'bg-blue-50'
                    }`}
                  >
                    <div className="flex">
                      <div className="flex-shrink-0">
                        {alert.type === 'warning' && <FaExclamationTriangle className="h-5 w-5 text-yellow-400" />}
                        {alert.type === 'success' && <FaCheckCircle className="h-5 w-5 text-green-400" />}
                        {alert.type === 'info' && <FaUsers className="h-5 w-5 text-blue-400" />}
                      </div>
                      <div className="ml-3">
                        <p className={`text-sm ${
                          alert.type === 'warning' ? 'text-yellow-800' :
                          alert.type === 'success' ? 'text-green-800' :
                          'text-blue-800'
                        }`}>
                          {alert.message}
                        </p>
                        <p className="mt-1 text-xs text-gray-500">
                          {new Date(alert.timestamp).toLocaleString()}
                        </p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Upcoming Events */}
          <div className="bg-white rounded-lg shadow overflow-hidden">
            <div className="px-6 py-4 border-b border-gray-200">
              <h2 className="text-lg font-semibold text-gray-900">Upcoming Events</h2>
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
                            <FaCalendarCheck className="h-4 w-4 mr-1" />
                            {new Date(event.date).toLocaleDateString()}
                          </div>
                          <div className="flex items-center">
                            <FaClock className="h-4 w-4 mr-1" />
                            {event.time}
                          </div>
                          <div className="flex items-center">
                            <FaMapMarkerAlt className="h-4 w-4 mr-1" />
                            {event.location}
                          </div>
                        </div>
                      </div>
                      <span className={`px-2 py-1 text-xs rounded-full ${
                        event.type === 'training' ? 'bg-blue-100 text-blue-800' :
                        event.type === 'workshop' ? 'bg-purple-100 text-purple-800' :
                        'bg-green-100 text-green-800'
                      }`}>
                        {event.type}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Volunteer Distribution */}
          <div className="bg-white rounded-lg shadow overflow-hidden">
            <div className="px-6 py-4 border-b border-gray-200">
              <h2 className="text-lg font-semibold text-gray-900">Volunteer Distribution</h2>
            </div>
            <div className="p-6">
              <div className="space-y-4">
                {dashboardData.volunteerDistribution.map((area) => (
                  <div key={area.area} className="flex items-center">
                    <div className="w-32 text-sm text-gray-600">{area.area}</div>
                    <div className="flex-1">
                      <div className="relative">
                        <div className="overflow-hidden h-2 text-xs flex rounded bg-blue-100">
                          <div
                            style={{ width: `${area.percentage}%` }}
                            className="shadow-none flex flex-col text-center whitespace-nowrap text-white justify-center bg-blue-500"
                          ></div>
                        </div>
                      </div>
                    </div>
                    <div className="w-20 text-right text-sm text-gray-600">
                      {area.count} ({area.percentage}%)
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

export default AdminDashboard;
