import React, { useState, useEffect } from 'react';
import { 
  FaCalendarAlt, 
  FaPlus, 
  FaEdit, 
  FaTrash, 
  FaEye, 
  FaFilter, 
  FaSearch,
  FaMapMarkerAlt,
  FaClock,
  FaUsers,
  FaUserCheck
} from 'react-icons/fa';

// Mock data for development
const mockEvents = [
  {
    id: 1,
    title: "Peer Support Group",
    description: "Weekly support group for individuals living with mental health conditions.",
    category: "Support Group",
    date: "2025-04-25",
    startTime: "18:00",
    endTime: "20:00",
    location: "Davis Community Center",
    type: "public",
    requiredVolunteers: 3,
    assignedVolunteers: [
      { id: 1, name: "Jane Smith" },
      { id: 3, name: "Sarah Williams" }
    ],
    maxParticipants: 20,
    registeredParticipants: 12,
    status: "scheduled"
  },
  {
    id: 2,
    title: "Family-to-Family Workshop",
    description: "Educational program for family members, partners and friends of individuals with mental health conditions.",
    category: "Workshop",
    date: "2025-04-28",
    startTime: "10:00",
    endTime: "14:00",
    location: "Woodland Library",
    type: "public",
    requiredVolunteers: 4,
    assignedVolunteers: [
      { id: 3, name: "Sarah Williams" }
    ],
    maxParticipants: 15,
    registeredParticipants: 8,
    status: "scheduled"
  },
  {
    id: 3,
    title: "Mental Health Awareness Presentation",
    description: "Educational presentation about mental health awareness and stigma reduction.",
    category: "Presentation",
    date: "2025-05-02",
    startTime: "13:00",
    endTime: "15:00",
    location: "UC Davis Campus",
    type: "public",
    requiredVolunteers: 2,
    assignedVolunteers: [],
    maxParticipants: 50,
    registeredParticipants: 15,
    status: "scheduled"
  },
  {
    id: 4,
    title: "Community Mental Health Fair",
    description: "Community event featuring resources, activities, and information about mental health services.",
    category: "Community Event",
    date: "2025-05-15",
    startTime: "10:00",
    endTime: "16:00",
    location: "Central Park, Davis",
    type: "public",
    requiredVolunteers: 5,
    assignedVolunteers: [],
    maxParticipants: 100,
    registeredParticipants: 25,
    status: "scheduled"
  },
  {
    id: 5,
    title: "Volunteer Training Session",
    description: "Training session for new volunteers.",
    category: "Training",
    date: "2025-05-05",
    startTime: "18:00",
    endTime: "21:00",
    location: "NAMI Yolo Office",
    type: "volunteers",
    requiredVolunteers: 2,
    assignedVolunteers: [
      { id: 1, name: "Jane Smith" },
      { id: 6, name: "James Wilson" }
    ],
    maxParticipants: 10,
    registeredParticipants: 8,
    status: "scheduled"
  },
  {
    id: 6,
    title: "Mindfulness and Mental Health",
    description: "Learn mindfulness techniques to improve mental wellbeing and reduce stress.",
    category: "Presentation",
    date: "2025-05-10",
    startTime: "11:00",
    endTime: "12:30",
    location: "Online (Zoom)",
    type: "public",
    requiredVolunteers: 1,
    assignedVolunteers: [
      { id: 4, name: "David Chen" }
    ],
    maxParticipants: 30,
    registeredParticipants: 15,
    status: "scheduled"
  },
  {
    id: 7,
    title: "NAMI Basics Workshop",
    description: "Educational program for parents and caregivers of children with mental health conditions.",
    category: "Workshop",
    date: "2025-04-15",
    startTime: "09:00",
    endTime: "15:00",
    location: "Woodland Library",
    type: "public",
    requiredVolunteers: 3,
    assignedVolunteers: [
      { id: 1, name: "Jane Smith" },
      { id: 3, name: "Sarah Williams" },
      { id: 7, name: "Linda Martinez" }
    ],
    maxParticipants: 20,
    registeredParticipants: 20,
    status: "completed"
  }
];

// Mock available volunteers for assignment
const mockAvailableVolunteers = [
  { id: 1, name: "Jane Smith", training: ["Peer-to-Peer", "Crisis Support"] },
  { id: 3, name: "Sarah Williams", training: ["Community Outreach", "Peer-to-Peer"] },
  { id: 4, name: "David Chen", training: ["Crisis Support"] },
  { id: 6, name: "James Wilson", training: ["Family-to-Family", "Community Outreach"] },
  { id: 7, name: "Linda Martinez", training: ["Crisis Support", "Peer-to-Peer"] }
];

function ManageEvents() {
  const [events, setEvents] = useState([]);
  const [filteredEvents, setFilteredEvents] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [filters, setFilters] = useState({
    category: '',
    status: '',
    dateRange: '',
    type: ''
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedEvent, setSelectedEvent] = useState(null);
  const [isViewModalOpen, setIsViewModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [isAssignModalOpen, setIsAssignModalOpen] = useState(false);
  const [currentAction, setCurrentAction] = useState('');
  const [availableVolunteers, setAvailableVolunteers] = useState([]);
  const [selectedVolunteers, setSelectedVolunteers] = useState([]);

  // Simulate API call to fetch events
  useEffect(() => {
    setLoading(true);
    setTimeout(() => {
      setEvents(mockEvents);
      setFilteredEvents(mockEvents);
      setLoading(false);
    }, 800);
  }, []);

  const handleSearch = (e) => {
    e.preventDefault();
    
    const filtered = events.filter(event => {
      const matchesSearch = event.title.toLowerCase().includes(searchTerm.toLowerCase()) || 
                           event.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           event.location.toLowerCase().includes(searchTerm.toLowerCase());
      
      const matchesCategory = filters.category ? 
                             event.category === filters.category : true;
      
      const matchesStatus = filters.status ? 
                           event.status === filters.status : true;
      
      const matchesType = filters.type ? 
                         event.type === filters.type : true;
      
      let matchesDateRange = true;
      if (filters.dateRange) {
        const today = new Date();
        const eventDate = new Date(event.date);
        
        if (filters.dateRange === 'upcoming') {
          matchesDateRange = eventDate >= today;
        } else if (filters.dateRange === 'past') {
          matchesDateRange = eventDate < today;
        } else if (filters.dateRange === 'thisMonth') {
          matchesDateRange = eventDate.getMonth() === today.getMonth() && 
                            eventDate.getFullYear() === today.getFullYear();
        } else if (filters.dateRange === 'nextMonth') {
          const nextMonth = new Date(today);
          nextMonth.setMonth(nextMonth.getMonth() + 1);
          matchesDateRange = eventDate.getMonth() === nextMonth.getMonth() && 
                            eventDate.getFullYear() === nextMonth.getFullYear();
        }
      }
      
      return matchesSearch && matchesCategory && matchesStatus && matchesType && matchesDateRange;
    });
    
    setFilteredEvents(filtered);
  };

  const openViewModal = (event) => {
    setSelectedEvent(event);
    setIsViewModalOpen(true);
  };

  const openEditModal = (event) => {
    setSelectedEvent(event);
    setIsEditModalOpen(true);
    setCurrentAction('edit');
  };

  const openAddModal = () => {
    setSelectedEvent(null);
    setIsAddModalOpen(true);
    setCurrentAction('add');
  };

  const openDeleteModal = (event) => {
    setSelectedEvent(event);
    setIsDeleteModalOpen(true);
  };

  const openAssignModal = (event) => {
    setSelectedEvent(event);
    // Filter volunteers based on event requirements (in a real app)
    setAvailableVolunteers(mockAvailableVolunteers);
    // Pre-select currently assigned volunteers
    setSelectedVolunteers(event.assignedVolunteers.map(v => v.id));
    setIsAssignModalOpen(true);
  };

  const closeModals = () => {
    setIsViewModalOpen(false);
    setIsEditModalOpen(false);
    setIsAddModalOpen(false);
    setIsDeleteModalOpen(false);
    setIsAssignModalOpen(false);
    setSelectedEvent(null);
    setSelectedVolunteers([]);
  };

  const handleDelete = (id) => {
    // In a real app, this would make an API call
    const updatedEvents = events.filter(event => event.id !== id);
    
    setEvents(updatedEvents);
    setFilteredEvents(
      filteredEvents.filter(event => event.id !== id)
    );
    
    closeModals();
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // In a real app, this would make an API call
    // For now, we'll just close the modal
    closeModals();
  };

  const handleVolunteerToggle = (volunteerId) => {
    setSelectedVolunteers(prev => {
      if (prev.includes(volunteerId)) {
        return prev.filter(id => id !== volunteerId);
      } else {
        return [...prev, volunteerId];
      }
    });
  };

  const handleAssignVolunteers = () => {
    // In a real app, this would make an API call
    // For this demo, we'll update the local state
    const updatedEvents = events.map(event => {
      if (event.id === selectedEvent.id) {
        const assignedVolunteers = mockAvailableVolunteers
          .filter(volunteer => selectedVolunteers.includes(volunteer.id))
          .map(volunteer => ({ id: volunteer.id, name: volunteer.name }));
        
        return { ...event, assignedVolunteers };
      }
      return event;
    });
    
    setEvents(updatedEvents);
    setFilteredEvents(
      filteredEvents.map(event => {
        if (event.id === selectedEvent.id) {
          const assignedVolunteers = mockAvailableVolunteers
            .filter(volunteer => selectedVolunteers.includes(volunteer.id))
            .map(volunteer => ({ id: volunteer.id, name: volunteer.name }));
          
          return { ...event, assignedVolunteers };
        }
        return event;
      })
    );
    
    closeModals();
  };

  // Sample categories
  const categories = [
    'Support Group', 
    'Workshop', 
    'Presentation', 
    'Community Event',
    'Training'
  ];

  // Sample statuses
  const statuses = [
    'scheduled', 
    'completed', 
    'cancelled'
  ];

  // Sample event types
  const eventTypes = [
    'public', 
    'volunteers', 
    'participants', 
    'private'
  ];

  // Sample date ranges
  const dateRanges = [
    { value: 'upcoming', label: 'Upcoming' },
    { value: 'past', label: 'Past' },
    { value: 'thisMonth', label: 'This Month' },
    { value: 'nextMonth', label: 'Next Month' }
  ];

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <div className="bg-red-50 border-l-4 border-red-400 p-4">
          <div className="flex">
            <div className="flex-shrink-0">
              <svg className="h-5 w-5 text-red-400" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
              </svg>
            </div>
            <div className="ml-3">
              <p className="text-sm text-red-700">{error}</p>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
      <div className="md:flex md:items-center md:justify-between mb-6">
        <div className="flex-1 min-w-0">
          <h2 className="text-2xl font-bold leading-7 text-gray-900 sm:text-3xl sm:truncate">
            Manage Events
          </h2>
        </div>
        <div className="mt-4 flex md:mt-0 md:ml-4">
          <button
            type="button"
            onClick={openAddModal}
            className="ml-3 inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
          >
            <FaPlus className="-ml-1 mr-2 h-5 w-5" aria-hidden="true" />
            Add Event
          </button>
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
                      placeholder="Search by title, description, or location"
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

              <div className="sm:col-span-2 lg:col-span-1">
                <label htmlFor="category" className="block text-sm font-medium text-gray-700">
                  Category
                </label>
                <select
                  id="category"
                  value={filters.category}
                  onChange={(e) => setFilters({...filters, category: e.target.value})}
                  className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm rounded-md"
                >
                  <option value="">Any Category</option>
                  {categories.map((category) => (
                    <option key={category} value={category}>{category}</option>
                  ))}
                </select>
              </div>

              <div className="sm:col-span-2 lg:col-span-1">
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
                  {statuses.map((status) => (
                    <option key={status} value={status}>{status}</option>
                  ))}
                </select>
              </div>

              <div className="sm:col-span-2 lg:col-span-1">
                <label htmlFor="dateRange" className="block text-sm font-medium text-gray-700">
                  Date Range
                </label>
                <select
                  id="dateRange"
                  value={filters.dateRange}
                  onChange={(e) => setFilters({...filters, dateRange: e.target.value})}
                  className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm rounded-md"
                >
                  <option value="">Any Date</option>
                  {dateRanges.map((range) => (
                    <option key={range.value} value={range.value}>{range.label}</option>
                  ))}
                </select>
              </div>

              <div className="sm:col-span-2 lg:col-span-1">
                <label htmlFor="type" className="block text-sm font-medium text-gray-700">
                  Event Type
                </label>
                <select
                  id="type"
                  value={filters.type}
                  onChange={(e) => setFilters({...filters, type: e.target.value})}
                  className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm rounded-md"
                >
                  <option value="">Any Type</option>
                  {eventTypes.map((type) => (
                    <option key={type} value={type}>{type}</option>
                  ))}
                </select>
              </div>
            </div>
          </form>
        </div>
      </div>

      {/* Events table */}
      <div className="flex flex-col">
        <div className="-my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
          <div className="py-2 align-middle inline-block min-w-full sm:px-6 lg:px-8">
            <div className="shadow overflow-hidden border-b border-gray-200 sm:rounded-lg">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Event
                    </th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Date & Time
                    </th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Location
                    </th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Volunteers
                    </th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Participants
                    </th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Status
                    </th>
                    <th scope="col" className="relative px-6 py-3">
                      <span className="sr-only">Actions</span>
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {filteredEvents.length > 0 ? (
                    filteredEvents.map((event) => (
                      <tr key={event.id}>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="flex items-center">
                            <div className="flex-shrink-0 h-10 w-10">
                              <div className="h-10 w-10 rounded-full bg-blue-100 flex items-center justify-center">
                                <FaCalendarAlt className="h-5 w-5 text-blue-500" />
                              </div>
                            </div>
                            <div className="ml-4">
                              <div className="text-sm font-medium text-gray-900">{event.title}</div>
                              <div className="text-sm text-gray-500">{event.category}</div>
                            </div>
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="text-sm text-gray-900">
                            {new Date(event.date).toLocaleDateString()}
                          </div>
                          <div className="text-sm text-gray-500">
                            {event.startTime} - {event.endTime}
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="text-sm text-gray-900">{event.location}</div>
                          <div className="text-sm text-gray-500">{event.type} event</div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="text-sm text-gray-900">
                            {event.assignedVolunteers.length} / {event.requiredVolunteers}
                          </div>
                          <div className="text-sm text-gray-500">
                            {event.assignedVolunteers.length < event.requiredVolunteers ? 
                              <span className="text-red-500">Needs {event.requiredVolunteers - event.assignedVolunteers.length} more</span> : 
                              <span className="text-green-500">Fully staffed</span>
                            }
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="text-sm text-gray-900">
                            {event.registeredParticipants} / {event.maxParticipants}
                          </div>
                          <div className="text-sm text-gray-500">
                            {Math.round((event.registeredParticipants / event.maxParticipants) * 100)}% registered
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                            event.status === 'scheduled' ? 'bg-blue-100 text-blue-800' : 
                            event.status === 'completed' ? 'bg-green-100 text-green-800' : 
                            'bg-red-100 text-red-800'
                          }`}>
                            {event.status}
                          </span>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                          <div className="flex justify-end space-x-2">
                            <button 
                              onClick={() => openViewModal(event)}
                              className="text-blue-600 hover:text-blue-900"
                              title="View Details"
                            >
                              <FaEye className="h-4 w-4" />
                            </button>
                            <button 
                              onClick={() => openEditModal(event)}
                              className="text-indigo-600 hover:text-indigo-900"
                              title="Edit"
                            >
                              <FaEdit className="h-4 w-4" />
                            </button>
                            <button 
                              onClick={() => openAssignModal(event)}
                              className="text-green-600 hover:text-green-900"
                              title="Assign Volunteers"
                            >
                              <FaUserCheck className="h-4 w-4" />
                            </button>
                            <button 
                              onClick={() => openDeleteModal(event)}
                              className="text-red-600 hover:text-red-900"
                              title="Delete"
                            >
                              <FaTrash className="h-4 w-4" />
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td colSpan="7" className="px-6 py-4 text-center text-sm text-gray-500">
                        No events found matching your criteria
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>

      {/* Pagination */}
      <div className="bg-white px-4 py-3 flex items-center justify-between border-t border-gray-200 sm:px-6 mt-4 rounded-lg shadow">
        <div className="flex-1 flex justify-between sm:hidden">
          <button className="relative inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50">
            Previous
          </button>
          <button className="ml-3 relative inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50">
            Next
          </button>
        </div>
        <div className="hidden sm:flex-1 sm:flex sm:items-center sm:justify-between">
          <div>
            <p className="text-sm text-gray-700">
              Showing <span className="font-medium">1</span> to <span className="font-medium">{filteredEvents.length}</span> of{' '}
              <span className="font-medium">{events.length}</span> results
            </p>
          </div>
          <div>
            <nav className="relative z-0 inline-flex rounded-md shadow-sm -space-x-px" aria-label="Pagination">
              <button className="relative inline-flex items-center px-2 py-2 rounded-l-md border border-gray-300 bg-white text-sm font-medium text-gray-500 hover:bg-gray-50">
                <span className="sr-only">Previous</span>
                <svg className="h-5 w-5" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                  <path fillRule="evenodd" d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z" clipRule="evenodd" />
                </svg>
              </button>
              <button aria-current="page" className="z-10 bg-blue-50 border-blue-500 text-blue-600 relative inline-flex items-center px-4 py-2 border text-sm font-medium">
                1
              </button>
              <button className="relative inline-flex items-center px-2 py-2 rounded-r-md border border-gray-300 bg-white text-sm font-medium text-gray-500 hover:bg-gray-50">
                <span className="sr-only">Next</span>
                <svg className="h-5 w-5" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                  <path fillRule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clipRule="evenodd" />
                </svg>
              </button>
            </nav>
          </div>
        </div>
      </div>

      {/* View Event Modal */}
      {isViewModalOpen && selectedEvent && (
        <div className="fixed inset-0 overflow-y-auto z-50">
          <div className="flex items-center justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
            <div className="fixed inset-0 transition-opacity" aria-hidden="true">
              <div className="absolute inset-0 bg-gray-500 opacity-75"></div>
            </div>
            <span className="hidden sm:inline-block sm:align-middle sm:h-screen" aria-hidden="true">&#8203;</span>
            <div className="inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full">
              <div className="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
                <div className="sm:flex sm:items-start">
                  <div className="mx-auto flex-shrink-0 flex items-center justify-center h-12 w-12 rounded-full bg-blue-100 sm:mx-0 sm:h-10 sm:w-10">
                    <FaCalendarAlt className="h-6 w-6 text-blue-600" />
                  </div>
                  <div className="mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left w-full">
                    <h3 className="text-lg leading-6 font-medium text-gray-900">{selectedEvent.title}</h3>
                    <div className="mt-2">
                      <p className="text-sm text-gray-500">{selectedEvent.description}</p>
                    </div>
                    <div className="mt-4 grid grid-cols-1 gap-y-4 gap-x-4 sm:grid-cols-2">
                      <div>
                        <h4 className="text-sm font-medium text-gray-500">Category</h4>
                        <p className="mt-1 text-sm text-gray-900">{selectedEvent.category}</p>
                      </div>
                      <div>
                        <h4 className="text-sm font-medium text-gray-500">Type</h4>
                        <p className="mt-1 text-sm text-gray-900">{selectedEvent.type}</p>
                      </div>
                      <div>
                        <h4 className="text-sm font-medium text-gray-500">Date</h4>
                        <p className="mt-1 text-sm text-gray-900">
                          {new Date(selectedEvent.date).toLocaleDateString()}
                        </p>
                      </div>
                      <div>
                        <h4 className="text-sm font-medium text-gray-500">Time</h4>
                        <p className="mt-1 text-sm text-gray-900">
                          {selectedEvent.startTime} - {selectedEvent.endTime}
                        </p>
                      </div>
                      <div>
                        <h4 className="text-sm font-medium text-gray-500">Location</h4>
                        <p className="mt-1 text-sm text-gray-900">{selectedEvent.location}</p>
                      </div>
                      <div>
                        <h4 className="text-sm font-medium text-gray-500">Status</h4>
                        <p className="mt-1">
                          <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                            selectedEvent.status === 'scheduled' ? 'bg-blue-100 text-blue-800' : 
                            selectedEvent.status === 'completed' ? 'bg-green-100 text-green-800' : 
                            'bg-red-100 text-red-800'
                          }`}>
                            {selectedEvent.status}
                          </span>
                        </p>
                      </div>
                      <div>
                        <h4 className="text-sm font-medium text-gray-500">Volunteers</h4>
                        <p className="mt-1 text-sm text-gray-900">
                          {selectedEvent.assignedVolunteers.length} / {selectedEvent.requiredVolunteers} assigned
                        </p>
                      </div>
                      <div>
                        <h4 className="text-sm font-medium text-gray-500">Participants</h4>
                        <p className="mt-1 text-sm text-gray-900">
                          {selectedEvent.registeredParticipants} / {selectedEvent.maxParticipants} registered
                        </p>
                      </div>
                    </div>
                    {selectedEvent.assignedVolunteers.length > 0 && (
                      <div className="mt-4">
                        <h4 className="text-sm font-medium text-gray-500">Assigned Volunteers</h4>
                        <ul className="mt-1 text-sm text-gray-900 list-disc pl-5">
                          {selectedEvent.assignedVolunteers.map(volunteer => (
                            <li key={volunteer.id}>{volunteer.name}</li>
                          ))}
                        </ul>
                      </div>
                    )}
                  </div>
                </div>
              </div>
              <div className="bg-gray-50 px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse">
                <button
                  type="button"
                  onClick={closeModals}
                  className="w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-blue-600 text-base font-medium text-white hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 sm:ml-3 sm:w-auto sm:text-sm"
                >
                  Close
                </button>
                <button
                  type="button"
                  onClick={() => {
                    closeModals();
                    openEditModal(selectedEvent);
                  }}
                  className="mt-3 w-full inline-flex justify-center rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-base font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 sm:mt-0 sm:ml-3 sm:w-auto sm:text-sm"
                >
                  Edit
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Add/Edit Event Modal */}
      {(isEditModalOpen || isAddModalOpen) && (
        <div className="fixed inset-0 overflow-y-auto z-50">
          <div className="flex items-center justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
            <div className="fixed inset-0 transition-opacity" aria-hidden="true">
              <div className="absolute inset-0 bg-gray-500 opacity-75"></div>
            </div>
            <span className="hidden sm:inline-block sm:align-middle sm:h-screen" aria-hidden="true">&#8203;</span>
            <div className="inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full">
              <form onSubmit={handleSubmit}>
                <div className="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
                  <div className="sm:flex sm:items-start">
                    <div className="mx-auto flex-shrink-0 flex items-center justify-center h-12 w-12 rounded-full bg-blue-100 sm:mx-0 sm:h-10 sm:w-10">
                      {currentAction === 'add' ? (
                        <FaPlus className="h-6 w-6 text-blue-600" />
                      ) : (
                        <FaEdit className="h-6 w-6 text-blue-600" />
                      )}
                    </div>
                    <div className="mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left w-full">
                      <h3 className="text-lg leading-6 font-medium text-gray-900">
                        {currentAction === 'add' ? 'Add New Event' : 'Edit Event'}
                      </h3>
                      <div className="mt-4 grid grid-cols-1 gap-y-4 gap-x-4 sm:grid-cols-2">
                        <div className="sm:col-span-2">
                          <label htmlFor="title" className="block text-sm font-medium text-gray-700">Title</label>
                          <input
                            type="text"
                            name="title"
                            id="title"
                            defaultValue={selectedEvent ? selectedEvent.title : ''}
                            className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                            required
                          />
                        </div>
                        <div className="sm:col-span-2">
                          <label htmlFor="description" className="block text-sm font-medium text-gray-700">Description</label>
                          <textarea
                            name="description"
                            id="description"
                            defaultValue={selectedEvent ? selectedEvent.description : ''}
                            rows={3}
                            className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                          />
                        </div>
                        <div>
                          <label htmlFor="category" className="block text-sm font-medium text-gray-700">Category</label>
                          <select
                            id="category"
                            name="category"
                            defaultValue={selectedEvent ? selectedEvent.category : ''}
                            className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm rounded-md"
                            required
                          >
                            <option value="">Select a category</option>
                            {categories.map((category) => (
                              <option key={category} value={category}>{category}</option>
                            ))}
                          </select>
                        </div>
                        <div>
                          <label htmlFor="type" className="block text-sm font-medium text-gray-700">Event Type</label>
                          <select
                            id="type"
                            name="type"
                            defaultValue={selectedEvent ? selectedEvent.type : 'public'}
                            className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm rounded-md"
                            required
                          >
                            {eventTypes.map((type) => (
                              <option key={type} value={type}>{type}</option>
                            ))}
                          </select>
                        </div>
                        <div>
                          <label htmlFor="date" className="block text-sm font-medium text-gray-700">Date</label>
                          <input
                            type="date"
                            name="date"
                            id="date"
                            defaultValue={selectedEvent ? selectedEvent.date : ''}
                            className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                            required
                          />
                        </div>
                        <div className="sm:col-span-2">
                          <div className="grid grid-cols-2 gap-4">
                            <div>
                              <label htmlFor="startTime" className="block text-sm font-medium text-gray-700">Start Time</label>
                              <input
                                type="time"
                                name="startTime"
                                id="startTime"
                                defaultValue={selectedEvent ? selectedEvent.startTime : ''}
                                className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                                required
                              />
                            </div>
                            <div>
                              <label htmlFor="endTime" className="block text-sm font-medium text-gray-700">End Time</label>
                              <input
                                type="time"
                                name="endTime"
                                id="endTime"
                                defaultValue={selectedEvent ? selectedEvent.endTime : ''}
                                className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                                required
                              />
                            </div>
                          </div>
                        </div>
                        <div className="sm:col-span-2">
                          <label htmlFor="location" className="block text-sm font-medium text-gray-700">Location</label>
                          <input
                            type="text"
                            name="location"
                            id="location"
                            defaultValue={selectedEvent ? selectedEvent.location : ''}
                            className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                            required
                          />
                        </div>
                        <div>
                          <label htmlFor="requiredVolunteers" className="block text-sm font-medium text-gray-700">
                            Required Volunteers
                          </label>
                          <input
                            type="number"
                            name="requiredVolunteers"
                            id="requiredVolunteers"
                            defaultValue={selectedEvent ? selectedEvent.requiredVolunteers : '1'}
                            min="0"
                            className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                            required
                          />
                        </div>
                        <div>
                          <label htmlFor="maxParticipants" className="block text-sm font-medium text-gray-700">
                            Max Participants
                          </label>
                          <input
                            type="number"
                            name="maxParticipants"
                            id="maxParticipants"
                            defaultValue={selectedEvent ? selectedEvent.maxParticipants : '10'}
                            min="1"
                            className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                            required
                          />
                        </div>
                        <div>
                          <label htmlFor="status" className="block text-sm font-medium text-gray-700">Status</label>
                          <select
                            id="status"
                            name="status"
                            defaultValue={selectedEvent ? selectedEvent.status : 'scheduled'}
                            className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm rounded-md"
                            required
                          >
                            {statuses.map((status) => (
                              <option key={status} value={status}>{status}</option>
                            ))}
                          </select>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="bg-gray-50 px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse">
                  <button
                    type="submit"
                    className="w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-blue-600 text-base font-medium text-white hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 sm:ml-3 sm:w-auto sm:text-sm"
                  >
                    {currentAction === 'add' ? 'Add Event' : 'Save Changes'}
                  </button>
                  <button
                    type="button"
                    onClick={closeModals}
                    className="mt-3 w-full inline-flex justify-center rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-base font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 sm:mt-0 sm:ml-3 sm:w-auto sm:text-sm"
                  >
                    Cancel
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}

      {/* Delete Confirmation Modal */}
      {isDeleteModalOpen && selectedEvent && (
        <div className="fixed inset-0 overflow-y-auto z-50">
          <div className="flex items-center justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
            <div className="fixed inset-0 transition-opacity" aria-hidden="true">
              <div className="absolute inset-0 bg-gray-500 opacity-75"></div>
            </div>
            <span className="hidden sm:inline-block sm:align-middle sm:h-screen" aria-hidden="true">&#8203;</span>
            <div className="inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full">
              <div className="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
                <div className="sm:flex sm:items-start">
                  <div className="mx-auto flex-shrink-0 flex items-center justify-center h-12 w-12 rounded-full bg-red-100 sm:mx-0 sm:h-10 sm:w-10">
                    <FaTrash className="h-6 w-6 text-red-600" />
                  </div>
                  <div className="mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left">
                    <h3 className="text-lg leading-6 font-medium text-gray-900">Delete Event</h3>
                    <div className="mt-2">
                      <p className="text-sm text-gray-500">
                        Are you sure you want to delete <strong>{selectedEvent.title}</strong>? This action cannot be undone.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
              <div className="bg-gray-50 px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse">
                <button
                  type="button"
                  onClick={() => handleDelete(selectedEvent.id)}
                  className="w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-red-600 text-base font-medium text-white hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 sm:ml-3 sm:w-auto sm:text-sm"
                >
                  Delete
                </button>
                <button
                  type="button"
                  onClick={closeModals}
                  className="mt-3 w-full inline-flex justify-center rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-base font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 sm:mt-0 sm:ml-3 sm:w-auto sm:text-sm"
                >
                  Cancel
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Assign Volunteers Modal */}
      {isAssignModalOpen && selectedEvent && (
        <div className="fixed inset-0 overflow-y-auto z-50">
          <div className="flex items-center justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
            <div className="fixed inset-0 transition-opacity" aria-hidden="true">
              <div className="absolute inset-0 bg-gray-500 opacity-75"></div>
            </div>
            <span className="hidden sm:inline-block sm:align-middle sm:h-screen" aria-hidden="true">&#8203;</span>
            <div className="inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full">
              <div className="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
                <div className="sm:flex sm:items-start">
                  <div className="mx-auto flex-shrink-0 flex items-center justify-center h-12 w-12 rounded-full bg-blue-100 sm:mx-0 sm:h-10 sm:w-10">
                    <FaUserCheck className="h-6 w-6 text-blue-600" />
                  </div>
                  <div className="mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left w-full">
                    <h3 className="text-lg leading-6 font-medium text-gray-900">
                      Assign Volunteers to Event
                    </h3>
                    <div className="mt-2">
                      <p className="text-sm text-gray-500">
                        Select volunteers to assign to <strong>{selectedEvent.title}</strong>.
                        This event requires {selectedEvent.requiredVolunteers} volunteers.
                      </p>
                    </div>
                    <div className="mt-4">
                      <h4 className="text-sm font-medium text-gray-700">Available Volunteers</h4>
                      <div className="mt-2 max-h-60 overflow-y-auto">
                        {availableVolunteers.map(volunteer => (
                          <div key={volunteer.id} className="flex items-start py-2">
                            <div className="flex items-center h-5">
                              <input
                                id={`volunteer-${volunteer.id}`}
                                name={`volunteer-${volunteer.id}`}
                                type="checkbox"
                                checked={selectedVolunteers.includes(volunteer.id)}
                                onChange={() => handleVolunteerToggle(volunteer.id)}
                                className="focus:ring-blue-500 h-4 w-4 text-blue-600 border-gray-300 rounded"
                              />
                            </div>
                            <div className="ml-3 text-sm">
                              <label htmlFor={`volunteer-${volunteer.id}`} className="font-medium text-gray-700">
                                {volunteer.name}
                              </label>
                              <p className="text-gray-500">{volunteer.training.join(', ')}</p>
                            </div>
                          </div>
                        ))}
                      </div>
                      <div className="flex justify-between mt-4 text-sm">
                        <span className="text-gray-700">
                          Selected: {selectedVolunteers.length} of {selectedEvent.requiredVolunteers} required
                        </span>
                        {selectedVolunteers.length < selectedEvent.requiredVolunteers ? (
                          <span className="text-yellow-600">
                            Need {selectedEvent.requiredVolunteers - selectedVolunteers.length} more
                          </span>
                        ) : (
                          <span className="text-green-600">
                            All positions filled
                          </span>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="bg-gray-50 px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse">
                <button
                  type="button"
                  onClick={handleAssignVolunteers}
                  className="w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-blue-600 text-base font-medium text-white hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 sm:ml-3 sm:w-auto sm:text-sm"
                >
                  Assign Volunteers
                </button>
                <button
                  type="button"
                  onClick={closeModals}
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

export default ManageEvents;
