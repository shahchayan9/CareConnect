import React, { useState, useEffect } from 'react';
import { 
  FaCalendarAlt, FaClock, FaMapMarkerAlt, FaFilter, 
  FaSearch, FaCheckCircle, FaHourglassHalf
} from 'react-icons/fa';
import api from '../../services/api';
import AvailableEvents from '../../components/volunteer/AvailableEvents';

// Mock data for development
const mockEventsData = {
  upcoming: [
    {
      id: 1,
      title: 'Crisis Support Hotline',
      type: 'Support',
      date: '2024-03-25',
      startTime: '2:00 PM',
      endTime: '6:00 PM',
      location: 'Remote',
      role: 'Crisis Support Volunteer',
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
      role: 'Group Facilitator',
      status: 'pending'
    }
  ],
  past: [
    {
      id: 3,
      title: 'Community Outreach Event',
      type: 'Outreach',
      date: '2024-03-10',
      startTime: '10:00 AM',
      endTime: '2:00 PM',
      location: 'Davis Farmers Market',
      role: 'Outreach Volunteer',
      status: 'completed',
      hoursLogged: 4,
      feedback: 'Great job engaging with the community!'
    },
    {
      id: 4,
      title: 'Peer Support Meeting',
      type: 'Support',
      date: '2024-03-05',
      startTime: '3:00 PM',
      endTime: '5:00 PM',
      location: 'Community Center',
      role: 'Peer Support Specialist',
      status: 'completed',
      hoursLogged: 2,
      feedback: 'Thank you for your dedication'
    }
  ],
  available: [
    {
      id: 5,
      title: 'Mental Health Workshop',
      type: 'Workshop',
      date: '2024-04-05',
      startTime: '1:00 PM',
      endTime: '4:00 PM',
      location: 'Public Library',
      volunteersNeeded: 2,
      requiredTraining: ['Mental Health First Aid']
    },
    {
      id: 6,
      title: 'Youth Support Group',
      type: 'Group',
      date: '2024-04-10',
      startTime: '4:00 PM',
      endTime: '6:00 PM',
      location: 'NAMI Yolo Office',
      volunteersNeeded: 1,
      requiredTraining: ['Youth Mental Health', 'Group Facilitation']
    }
  ]
};

function Events() {
  const [eventsData, setEventsData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [activeTab, setActiveTab] = useState('upcoming');
  const [filters, setFilters] = useState({
    type: '',
    location: '',
    dateRange: 'all'
  });
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    const fetchEventsData = async () => {
      try {
        setLoading(true);
        // Simulate API delay
        await new Promise(resolve => setTimeout(resolve, 1000));
        setEventsData(mockEventsData);
        setError(null);
      } catch (err) {
        console.error('Error fetching events data:', err);
        setError('Failed to load events data');
      } finally {
        setLoading(false);
      }
    };

    fetchEventsData();
  }, []);

  const handleSearch = (e) => {
    e.preventDefault();
    // Implement search functionality here
  };

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
            My Events
          </h2>
        </div>
      </div>

      {/* Search and filters */}
      <div className="bg-white shadow rounded-lg mb-6">
        <div className="px-4 py-5 sm:p-6">
          <form onSubmit={handleSearch}>
            <div className="grid grid-cols-1 gap-y-6 gap-x-4 sm:grid-cols-6">
              <div className="sm:col-span-6">
                <div className="mt-1 flex rounded-md shadow-sm">
                  <div className="relative flex items-stretch flex-grow focus-within:z-10">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <FaSearch className="h-5 w-5 text-gray-400" aria-hidden="true" />
                    </div>
                    <input
                      type="text"
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                      className="focus:ring-blue-500 focus:border-blue-500 block w-full rounded-none rounded-l-md pl-10 sm:text-sm border-gray-300"
                      placeholder="Search events"
                    />
                  </div>
                  <button
                    type="submit"
                    className="-ml-px relative inline-flex items-center space-x-2 px-4 py-2 border border-gray-300 text-sm font-medium rounded-r-md text-gray-700 bg-gray-50 hover:bg-gray-100 focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500"
                  >
                    <FaFilter className="h-5 w-5 text-gray-400" aria-hidden="true" />
                    <span>Filter</span>
                  </button>
                </div>
              </div>

              <div className="sm:col-span-2">
                <label htmlFor="type" className="block text-sm font-medium text-gray-700">
                  Type
                </label>
                <select
                  id="type"
                  value={filters.type}
                  onChange={(e) => setFilters({...filters, type: e.target.value})}
                  className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm rounded-md"
                >
                  <option value="">All Types</option>
                  <option value="Support">Support</option>
                  <option value="Group">Group</option>
                  <option value="Workshop">Workshop</option>
                  <option value="Outreach">Outreach</option>
                </select>
              </div>

              <div className="sm:col-span-2">
                <label htmlFor="location" className="block text-sm font-medium text-gray-700">
                  Location
                </label>
                <select
                  id="location"
                  value={filters.location}
                  onChange={(e) => setFilters({...filters, location: e.target.value})}
                  className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm rounded-md"
                >
                  <option value="">All Locations</option>
                  <option value="Remote">Remote</option>
                  <option value="NAMI Office">NAMI Office</option>
                  <option value="Community Center">Community Center</option>
                </select>
              </div>

              <div className="sm:col-span-2">
                <label htmlFor="dateRange" className="block text-sm font-medium text-gray-700">
                  Date Range
                </label>
                <select
                  id="dateRange"
                  value={filters.dateRange}
                  onChange={(e) => setFilters({...filters, dateRange: e.target.value})}
                  className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm rounded-md"
                >
                  <option value="all">All Dates</option>
                  <option value="week">This Week</option>
                  <option value="month">This Month</option>
                  <option value="quarter">This Quarter</option>
                </select>
              </div>
            </div>
          </form>
        </div>
      </div>

      {/* Tabs */}
      <div className="border-b border-gray-200 mb-6">
        <nav className="-mb-px flex space-x-8" aria-label="Tabs">
          {['upcoming', 'past', 'available'].map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`
                whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm
                ${activeTab === tab
                  ? 'border-blue-500 text-blue-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'}
              `}
            >
              {tab.charAt(0).toUpperCase() + tab.slice(1)}
            </button>
          ))}
        </nav>
      </div>

      {/* Event Lists */}
      <div className="space-y-6">
        {activeTab === 'upcoming' && eventsData.upcoming.map((event) => (
          <div key={event.id} className="bg-white shadow rounded-lg overflow-hidden">
            <div className="px-4 py-5 sm:p-6">
              <div className="flex items-center justify-between mb-4">
                <div>
                  <h3 className="text-lg font-medium text-gray-900">{event.title}</h3>
                  <span className={`mt-1 inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                    event.type === 'Support' ? 'bg-blue-100 text-blue-800' :
                    event.type === 'Group' ? 'bg-green-100 text-green-800' :
                    event.type === 'Workshop' ? 'bg-purple-100 text-purple-800' :
                    'bg-gray-100 text-gray-800'
                  }`}>
                    {event.type}
                  </span>
                </div>
                <span className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium ${
                  event.status === 'confirmed' ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800'
                }`}>
                  {event.status === 'confirmed' ? (
                    <><FaCheckCircle className="mr-1" /> Confirmed</>
                  ) : (
                    <><FaHourglassHalf className="mr-1" /> Pending</>
                  )}
                </span>
              </div>

              <div className="mt-4 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                <div className="flex items-center text-sm text-gray-500">
                  <FaCalendarAlt className="mr-2 text-gray-400" />
                  {new Date(event.date).toLocaleDateString()}
                </div>
                <div className="flex items-center text-sm text-gray-500">
                  <FaClock className="mr-2 text-gray-400" />
                  {event.startTime} - {event.endTime}
                </div>
                <div className="flex items-center text-sm text-gray-500">
                  <FaMapMarkerAlt className="mr-2 text-gray-400" />
                  {event.location}
                </div>
                <div className="text-sm text-gray-500">
                  Role: {event.role}
                </div>
              </div>
            </div>
          </div>
        ))}

        {activeTab === 'past' && eventsData.past.map((event) => (
          <div key={event.id} className="bg-white shadow rounded-lg overflow-hidden">
            <div className="px-4 py-5 sm:p-6">
              <div className="flex items-center justify-between mb-4">
                <div>
                  <h3 className="text-lg font-medium text-gray-900">{event.title}</h3>
                  <span className={`mt-1 inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                    event.type === 'Support' ? 'bg-blue-100 text-blue-800' :
                    event.type === 'Group' ? 'bg-green-100 text-green-800' :
                    event.type === 'Workshop' ? 'bg-purple-100 text-purple-800' :
                    'bg-gray-100 text-gray-800'
                  }`}>
                    {event.type}
                  </span>
                </div>
                <div className="text-sm text-gray-500">
                  {event.hoursLogged} hours logged
                </div>
              </div>

              <div className="mt-4 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                <div className="flex items-center text-sm text-gray-500">
                  <FaCalendarAlt className="mr-2 text-gray-400" />
                  {new Date(event.date).toLocaleDateString()}
                </div>
                <div className="flex items-center text-sm text-gray-500">
                  <FaClock className="mr-2 text-gray-400" />
                  {event.startTime} - {event.endTime}
                </div>
                <div className="flex items-center text-sm text-gray-500">
                  <FaMapMarkerAlt className="mr-2 text-gray-400" />
                  {event.location}
                </div>
                <div className="text-sm text-gray-500">
                  Role: {event.role}
                </div>
              </div>

              {event.feedback && (
                <div className="mt-4 bg-gray-50 rounded-md p-4">
                  <h4 className="text-sm font-medium text-gray-900">Feedback</h4>
                  <p className="mt-1 text-sm text-gray-500">{event.feedback}</p>
                </div>
              )}
            </div>
          </div>
        ))}

        {activeTab === 'available' && (
          <AvailableEvents events={eventsData.available} />
        )}
      </div>
    </div>
  );
}

export default Events; 