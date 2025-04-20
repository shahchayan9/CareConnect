import React, { useState, useEffect } from 'react';
import { FaCalendarAlt, FaClock, FaMapMarkerAlt, FaUserFriends, FaFilter, FaSearch } from 'react-icons/fa';

// Mock data for development
const mockEventsData = {
  upcomingEvents: [
    {
      id: 1,
      title: 'Wellness Workshop',
      description: 'Learn strategies for maintaining mental wellness in daily life.',
      date: '2024-03-25',
      time: '2:00 PM - 4:00 PM',
      location: 'Community Center Room 2',
      type: 'Workshop',
      facilitator: 'Dr. Emily Chen',
      capacity: 20,
      registered: 15,
      isRegistered: true
    },
    {
      id: 2,
      title: 'Support Group Meeting',
      description: 'Weekly support group for sharing experiences and coping strategies.',
      date: '2024-03-27',
      time: '6:00 PM - 7:30 PM',
      location: 'Online (Zoom)',
      type: 'Support Group',
      facilitator: 'Mark Wilson',
      capacity: 12,
      registered: 8,
      isRegistered: false
    },
    {
      id: 3,
      title: 'Family Education Program',
      description: 'Educational session for family members of individuals with mental health conditions.',
      date: '2024-03-30',
      time: '10:00 AM - 12:00 PM',
      location: 'Library Conference Room',
      type: 'Education',
      facilitator: 'Sarah Thompson',
      capacity: 25,
      registered: 18,
      isRegistered: false
    }
  ],
  pastEvents: [
    {
      id: 4,
      title: 'Stress Management Workshop',
      date: '2024-03-15',
      time: '3:00 PM - 5:00 PM',
      location: 'Community Center',
      type: 'Workshop',
      attended: true,
      feedback: 'Submitted'
    },
    {
      id: 5,
      title: 'Mindfulness Session',
      date: '2024-03-10',
      time: '6:00 PM - 7:00 PM',
      location: 'Online (Zoom)',
      type: 'Workshop',
      attended: true,
      feedback: 'Pending'
    }
  ]
};

function ParticipantEvents() {
  const [eventsData, setEventsData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [filters, setFilters] = useState({
    type: '',
    location: ''
  });
  const [showRegistrationModal, setShowRegistrationModal] = useState(false);
  const [selectedEvent, setSelectedEvent] = useState(null);

  useEffect(() => {
    const fetchEventsData = async () => {
      try {
        setLoading(true);
        // Simulate API call
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
    // Filter logic would go here
  };

  const handleRegister = (event) => {
    setSelectedEvent(event);
    setShowRegistrationModal(true);
  };

  const confirmRegistration = async () => {
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Update local state
      setEventsData(prevData => ({
        ...prevData,
        upcomingEvents: prevData.upcomingEvents.map(event =>
          event.id === selectedEvent.id
            ? { ...event, isRegistered: true, registered: event.registered + 1 }
            : event
        )
      }));
      
      setShowRegistrationModal(false);
    } catch (err) {
      console.error('Error registering for event:', err);
    }
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
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-gray-900">Events</h1>
        
        {/* Search and Filters */}
        <div className="mt-4 bg-white rounded-lg shadow p-6">
          <form onSubmit={handleSearch}>
            <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <FaSearch className="h-5 w-5 text-gray-400" />
                </div>
                <input
                  type="text"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md leading-5 bg-white placeholder-gray-500 focus:outline-none focus:placeholder-gray-400 focus:ring-1 focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                  placeholder="Search events..."
                />
              </div>
              
              <div>
                <select
                  value={filters.type}
                  onChange={(e) => setFilters({ ...filters, type: e.target.value })}
                  className="block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm rounded-md"
                >
                  <option value="">All Types</option>
                  <option value="Workshop">Workshop</option>
                  <option value="Support Group">Support Group</option>
                  <option value="Education">Education</option>
                </select>
              </div>
              
              <div>
                <select
                  value={filters.location}
                  onChange={(e) => setFilters({ ...filters, location: e.target.value })}
                  className="block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm rounded-md"
                >
                  <option value="">All Locations</option>
                  <option value="In-Person">In-Person</option>
                  <option value="Online">Online</option>
                </select>
              </div>
            </div>
          </form>
        </div>
      </div>

      {/* Upcoming Events */}
      <div className="bg-white rounded-lg shadow mb-8">
        <div className="px-6 py-4 border-b border-gray-200">
          <h2 className="text-lg font-semibold text-gray-900">Upcoming Events</h2>
        </div>
        <div className="p-6">
          <div className="space-y-6">
            {eventsData.upcomingEvents.map((event) => (
              <div key={event.id} className="border border-gray-200 rounded-lg p-6">
                <div className="flex justify-between items-start">
                  <div>
                    <h3 className="text-lg font-medium text-gray-900">{event.title}</h3>
                    <p className="mt-1 text-sm text-gray-500">{event.description}</p>
                  </div>
                  <span className={`px-2 py-1 text-xs rounded-full ${
                    event.type === 'Workshop' ? 'bg-blue-100 text-blue-800' :
                    event.type === 'Support Group' ? 'bg-green-100 text-green-800' :
                    'bg-purple-100 text-purple-800'
                  }`}>
                    {event.type}
                  </span>
                </div>
                
                <div className="mt-4 grid grid-cols-2 gap-4">
                  <div className="flex items-center text-sm text-gray-500">
                    <FaCalendarAlt className="mr-2 text-gray-400" />
                    {event.date}
                  </div>
                  <div className="flex items-center text-sm text-gray-500">
                    <FaClock className="mr-2 text-gray-400" />
                    {event.time}
                  </div>
                  <div className="flex items-center text-sm text-gray-500">
                    <FaMapMarkerAlt className="mr-2 text-gray-400" />
                    {event.location}
                  </div>
                  <div className="flex items-center text-sm text-gray-500">
                    <FaUserFriends className="mr-2 text-gray-400" />
                    {event.registered} / {event.capacity} registered
                  </div>
                </div>
                
                <div className="mt-6 flex justify-between items-center">
                  <div className="text-sm text-gray-500">
                    Facilitator: {event.facilitator}
                  </div>
                  {event.isRegistered ? (
                    <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-green-100 text-green-800">
                      Registered ✓
                    </span>
                  ) : (
                    <button
                      onClick={() => handleRegister(event)}
                      className="px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                    >
                      Register
                    </button>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Past Events */}
      <div className="bg-white rounded-lg shadow">
        <div className="px-6 py-4 border-b border-gray-200">
          <h2 className="text-lg font-semibold text-gray-900">Past Events</h2>
        </div>
        <div className="p-6">
          <div className="space-y-4">
            {eventsData.pastEvents.map((event) => (
              <div key={event.id} className="flex justify-between items-center p-4 border border-gray-200 rounded-lg">
                <div>
                  <h3 className="text-sm font-medium text-gray-900">{event.title}</h3>
                  <div className="mt-1 text-xs text-gray-500">
                    {event.date} • {event.time} • {event.location}
                  </div>
                </div>
                <div className="flex items-center space-x-4">
                  <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                    event.attended ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-800'
                  }`}>
                    {event.attended ? 'Attended' : 'Missed'}
                  </span>
                  {event.attended && (
                    <button
                      className={`text-sm font-medium ${
                        event.feedback === 'Submitted' 
                          ? 'text-green-600' 
                          : 'text-blue-600 hover:text-blue-800'
                      }`}
                      disabled={event.feedback === 'Submitted'}
                    >
                      {event.feedback === 'Submitted' ? 'Feedback Submitted' : 'Provide Feedback'}
                    </button>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Registration Modal */}
      {showRegistrationModal && selectedEvent && (
        <div className="fixed inset-0 overflow-y-auto z-50">
          <div className="flex items-center justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
            <div className="fixed inset-0 transition-opacity">
              <div className="absolute inset-0 bg-gray-500 opacity-75"></div>
            </div>
            <span className="hidden sm:inline-block sm:align-middle sm:h-screen"></span>
            <div className="inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full">
              <div className="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
                <div className="sm:flex sm:items-start">
                  <div className="mt-3 text-center sm:mt-0 sm:text-left">
                    <h3 className="text-lg leading-6 font-medium text-gray-900">
                      Register for {selectedEvent.title}
                    </h3>
                    <div className="mt-2">
                      <p className="text-sm text-gray-500">
                        Are you sure you want to register for this event? You will receive a confirmation email with additional details.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
              <div className="bg-gray-50 px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse">
                <button
                  type="button"
                  onClick={confirmRegistration}
                  className="w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-blue-600 text-base font-medium text-white hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 sm:ml-3 sm:w-auto sm:text-sm"
                >
                  Confirm Registration
                </button>
                <button
                  type="button"
                  onClick={() => setShowRegistrationModal(false)}
                  className="mt-3 w-full inline-flex justify-center rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-base font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 sm:mt-0 sm:ml-3 sm:w-auto sm:text-sm"
                >
                  Cancel
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default ParticipantEvents; 