import React, { useState, useEffect } from 'react';
import { FaMapMarkerAlt, FaFilter, FaSearch, FaUserFriends } from 'react-icons/fa';
import api from '../../services/api';

// Mock data for development
const mockVolunteers = [
  {
    id: 1,
    name: 'Sarah Wilson',
    location: { lat: 38.5449, lng: -121.7405 },
    status: 'active',
    training: ['Peer Support', 'Crisis Intervention'],
    availability: 'weekday'
  },
  {
    id: 2,
    name: 'Michael Chen',
    location: { lat: 38.5816, lng: -121.4944 },
    status: 'active',
    training: ['Family Support'],
    availability: 'weekend'
  },
  {
    id: 3,
    name: 'Emily Rodriguez',
    location: { lat: 38.6791, lng: -121.7740 },
    status: 'pending',
    training: ['Peer Support'],
    availability: 'evening'
  }
];

const mockStats = {
  totalVolunteers: 45,
  activeVolunteers: 32,
  coverageAreas: 8
};

function VolunteerMap() {
  const [volunteers, setVolunteers] = useState(mockVolunteers);
  const [filters, setFilters] = useState({
    status: '',
    trainingType: '',
    availability: ''
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [stats, setStats] = useState(mockStats);

  useEffect(() => {
    // Simulate API call delay
    const fetchMapData = async () => {
      try {
        setLoading(true);
        // Simulate API delay
        await new Promise(resolve => setTimeout(resolve, 1000));
        setVolunteers(mockVolunteers);
        setStats(mockStats);
        setError(null);
      } catch (err) {
        console.error('Error fetching map data:', err);
        setError('Failed to load volunteer map data');
      } finally {
        setLoading(false);
      }
    };

    fetchMapData();
  }, []);

  // Filter volunteers based on selected filters
  const filteredVolunteers = volunteers.filter(volunteer => {
    if (filters.status && volunteer.status !== filters.status) return false;
    if (filters.trainingType && !volunteer.training.includes(filters.trainingType)) return false;
    if (filters.availability && volunteer.availability !== filters.availability) return false;
    return true;
  });

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
      <div className="md:flex md:items-center md:justify-between mb-6">
        <div className="flex-1 min-w-0">
          <h2 className="text-2xl font-bold leading-7 text-gray-900 sm:text-3xl sm:truncate">
            Volunteer Map
          </h2>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
        <div className="bg-white rounded-lg shadow p-6">
          <div className="flex items-center">
            <div className="flex-shrink-0 bg-blue-100 rounded-md p-3">
              <FaUserFriends className="h-6 w-6 text-blue-600" />
            </div>
            <div className="ml-4">
              <h3 className="text-lg font-medium text-gray-900">{stats.totalVolunteers}</h3>
              <p className="text-sm text-gray-500">Total Volunteers</p>
            </div>
          </div>
        </div>
        <div className="bg-white rounded-lg shadow p-6">
          <div className="flex items-center">
            <div className="flex-shrink-0 bg-green-100 rounded-md p-3">
              <FaUserFriends className="h-6 w-6 text-green-600" />
            </div>
            <div className="ml-4">
              <h3 className="text-lg font-medium text-gray-900">{stats.activeVolunteers}</h3>
              <p className="text-sm text-gray-500">Active Volunteers</p>
            </div>
          </div>
        </div>
        <div className="bg-white rounded-lg shadow p-6">
          <div className="flex items-center">
            <div className="flex-shrink-0 bg-purple-100 rounded-md p-3">
              <FaMapMarkerAlt className="h-6 w-6 text-purple-600" />
            </div>
            <div className="ml-4">
              <h3 className="text-lg font-medium text-gray-900">{stats.coverageAreas}</h3>
              <p className="text-sm text-gray-500">Coverage Areas</p>
            </div>
          </div>
        </div>
      </div>

      {/* Filters */}
      <div className="bg-white shadow rounded-lg mb-6">
        <div className="px-4 py-5 sm:p-6">
          <div className="grid grid-cols-1 gap-y-6 gap-x-4 sm:grid-cols-6">
            <div className="sm:col-span-2">
              <label htmlFor="status" className="block text-sm font-medium text-gray-700">
                Status
              </label>
              <select
                id="status"
                value={filters.status}
                onChange={(e) => setFilters({...filters, status: e.target.value})}
                className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm rounded-md"
              >
                <option value="">Any Status</option>
                <option value="active">Active</option>
                <option value="inactive">Inactive</option>
                <option value="pending">Pending</option>
              </select>
            </div>

            <div className="sm:col-span-2">
              <label htmlFor="training" className="block text-sm font-medium text-gray-700">
                Training Type
              </label>
              <select
                id="training"
                value={filters.trainingType}
                onChange={(e) => setFilters({...filters, trainingType: e.target.value})}
                className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm rounded-md"
              >
                <option value="">Any Training</option>
                <option value="Peer Support">Peer Support</option>
                <option value="Crisis Intervention">Crisis Intervention</option>
                <option value="Family Support">Family Support</option>
              </select>
            </div>

            <div className="sm:col-span-2">
              <label htmlFor="availability" className="block text-sm font-medium text-gray-700">
                Availability
              </label>
              <select
                id="availability"
                value={filters.availability}
                onChange={(e) => setFilters({...filters, availability: e.target.value})}
                className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm rounded-md"
              >
                <option value="">Any Time</option>
                <option value="weekday">Weekdays</option>
                <option value="weekend">Weekends</option>
                <option value="evening">Evenings</option>
              </select>
            </div>
          </div>
        </div>
      </div>

      {/* Map Container */}
      <div className="bg-white shadow rounded-lg">
        <div className="px-4 py-5 sm:p-6">
          <div className="h-[600px] bg-gray-100 rounded-lg flex flex-col items-center justify-center">
            <div className="text-center text-gray-500">
              <FaMapMarkerAlt className="h-12 w-12 mx-auto mb-4" />
              <p className="text-lg font-medium mb-2">Map visualization would be rendered here</p>
              <p className="text-sm mb-4">Using a mapping library like Google Maps or Mapbox</p>
            </div>
            {/* Display filtered volunteers */}
            <div className="w-full max-w-md bg-white rounded-lg shadow p-4 mt-4">
              <h4 className="text-sm font-medium text-gray-700 mb-2">
                Showing {filteredVolunteers.length} volunteers in view
              </h4>
              <div className="space-y-2">
                {filteredVolunteers.map(volunteer => (
                  <div key={volunteer.id} className="flex items-center justify-between p-2 hover:bg-gray-50 rounded">
                    <div>
                      <p className="text-sm font-medium text-gray-900">{volunteer.name}</p>
                      <p className="text-xs text-gray-500">{volunteer.training.join(', ')}</p>
                    </div>
                    <span className={`px-2 py-1 text-xs rounded-full ${
                      volunteer.status === 'active' ? 'bg-green-100 text-green-800' :
                      volunteer.status === 'pending' ? 'bg-yellow-100 text-yellow-800' :
                      'bg-gray-100 text-gray-800'
                    }`}>
                      {volunteer.status}
                    </span>
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

export default VolunteerMap; 