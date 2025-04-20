import React, { useState, useEffect } from 'react';
import { 
  FaSearch, 
  FaFilter, 
  FaEye, 
  FaEdit, 
  FaCheck, 
  FaTimes, 
  FaDownload,
  FaPlus,
  FaUser
} from 'react-icons/fa';

// This would typically come from an API
const mockVolunteers = [
  {
    id: 1,
    name: 'Jane Smith',
    email: 'jane.smith@example.com',
    phone: '555-987-6543',
    city: 'Davis',
    state: 'CA',
    training: ['Peer-to-Peer', 'Crisis Support'],
    status: 'active',
    hoursLogged: 28,
    joinDate: '2025-01-15',
    lastActive: '2025-04-10'
  },
  {
    id: 2,
    name: 'Michael Johnson',
    email: 'michael.j@example.com',
    phone: '555-456-7890',
    city: 'Woodland',
    state: 'CA',
    training: ['Family-to-Family'],
    status: 'pending',
    hoursLogged: 0,
    joinDate: '2025-03-22',
    lastActive: null
  },
  {
    id: 3,
    name: 'Sarah Williams',
    email: 'sarah.w@example.com',
    phone: '555-234-5678',
    city: 'West Sacramento',
    state: 'CA',
    training: ['Community Outreach', 'Peer-to-Peer'],
    status: 'active',
    hoursLogged: 42,
    joinDate: '2024-11-05',
    lastActive: '2025-04-15'
  },
  {
    id: 4,
    name: 'David Chen',
    email: 'david.c@example.com',
    phone: '555-345-6789',
    city: 'Davis',
    state: 'CA',
    training: ['Crisis Support'],
    status: 'on-leave',
    hoursLogged: 15,
    joinDate: '2024-12-03',
    lastActive: '2025-02-28'
  },
  {
    id: 5,
    name: 'Emily Rodriguez',
    email: 'emily.r@example.com',
    phone: '555-567-8901',
    city: 'Winters',
    state: 'CA',
    training: ['Peer-to-Peer'],
    status: 'pending',
    hoursLogged: 0,
    joinDate: '2025-04-01',
    lastActive: null
  },
  {
    id: 6,
    name: 'James Wilson',
    email: 'james.w@example.com',
    phone: '555-678-9012',
    city: 'Davis',
    state: 'CA',
    training: ['Family-to-Family', 'Community Outreach'],
    status: 'active',
    hoursLogged: 36,
    joinDate: '2024-10-17',
    lastActive: '2025-04-08'
  },
  {
    id: 7,
    name: 'Linda Martinez',
    email: 'linda.m@example.com',
    phone: '555-789-0123',
    city: 'Woodland',
    state: 'CA',
    training: ['Crisis Support', 'Peer-to-Peer'],
    status: 'active',
    hoursLogged: 52,
    joinDate: '2024-09-21',
    lastActive: '2025-04-12'
  },
  {
    id: 8,
    name: 'Robert Brown',
    email: 'robert.b@example.com',
    phone: '555-890-1234',
    city: 'West Sacramento',
    state: 'CA',
    training: ['Community Outreach'],
    status: 'inactive',
    hoursLogged: 8,
    joinDate: '2025-02-09',
    lastActive: '2025-03-01'
  }
];

function ManageVolunteers() {
  const [volunteers, setVolunteers] = useState([]);
  const [filteredVolunteers, setFilteredVolunteers] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [filters, setFilters] = useState({
    trainingType: '',
    status: '',
    location: ''
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedVolunteer, setSelectedVolunteer] = useState(null);
  const [isViewModalOpen, setIsViewModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);

  // Simulate API call to fetch volunteers
  useEffect(() => {
    setLoading(true);
    setTimeout(() => {
      setVolunteers(mockVolunteers);
      setFilteredVolunteers(mockVolunteers);
      setLoading(false);
    }, 800);
  }, []);

  const handleSearch = (e) => {
    e.preventDefault();
    
    const filtered = volunteers.filter(volunteer => {
      const matchesSearch = volunteer.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
                           volunteer.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           volunteer.phone.includes(searchTerm);
      
      const matchesTraining = filters.trainingType ? 
                             volunteer.training.includes(filters.trainingType) : true;
      
      const matchesStatus = filters.status ? 
                           volunteer.status === filters.status : true;
      
      const matchesLocation = filters.location ? 
                             volunteer.city === filters.location : true;
      
      return matchesSearch && matchesTraining && matchesStatus && matchesLocation;
    });
    
    setFilteredVolunteers(filtered);
  };

  const handleApprove = (id) => {
    // In a real app, this would make an API call
    const updatedVolunteers = volunteers.map(volunteer => 
      volunteer.id === id ? {...volunteer, status: 'active'} : volunteer
    );
    
    setVolunteers(updatedVolunteers);
    setFilteredVolunteers(
      filteredVolunteers.map(volunteer => 
        volunteer.id === id ? {...volunteer, status: 'active'} : volunteer
      )
    );
  };

  const handleReject = (id) => {
    // In a real app, this would make an API call
    const updatedVolunteers = volunteers.map(volunteer => 
      volunteer.id === id ? {...volunteer, status: 'inactive'} : volunteer
    );
    
    setVolunteers(updatedVolunteers);
    setFilteredVolunteers(
      filteredVolunteers.map(volunteer => 
        volunteer.id === id ? {...volunteer, status: 'inactive'} : volunteer
      )
    );
  };

  const openViewModal = (volunteer) => {
    setSelectedVolunteer(volunteer);
    setIsViewModalOpen(true);
  };

  const openEditModal = (volunteer) => {
    setSelectedVolunteer(volunteer);
    setIsEditModalOpen(true);
  };

  const closeModals = () => {
    setIsViewModalOpen(false);
    setIsEditModalOpen(false);
    setSelectedVolunteer(null);
  };

  // Sample training options
  const trainingOptions = [
    'Peer-to-Peer', 
    'Family-to-Family', 
    'Crisis Support', 
    'Community Outreach'
  ];

  // Sample locations
  const locations = [
    'Davis', 
    'Woodland', 
    'West Sacramento', 
    'Winters'
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
            Manage Volunteers
          </h2>
        </div>
        <div className="mt-4 flex md:mt-0 md:ml-4">
          <button
            type="button"
            className="ml-3 inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
          >
            <FaPlus className="-ml-1 mr-2 h-5 w-5" aria-hidden="true" />
            Add Volunteer
          </button>
          <button
            type="button"
            className="ml-3 inline-flex items-center px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
          >
            <FaDownload className="-ml-1 mr-2 h-5 w-5" aria-hidden="true" />
            Export
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
                      placeholder="Search by name, email, or phone"
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
                <label htmlFor="training-type" className="block text-sm font-medium text-gray-700">
                  Training
                </label>
                <select
                  id="training-type"
                  value={filters.trainingType}
                  onChange={(e) => setFilters({...filters, trainingType: e.target.value})}
                  className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm rounded-md"
                >
                  <option value="">Any Training</option>
                  {trainingOptions.map((training) => (
                    <option key={training} value={training}>{training}</option>
                  ))}
                </select>
              </div>

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
                  <option value="pending">Pending Approval</option>
                  <option value="on-leave">On Leave</option>
                  <option value="inactive">Inactive</option>
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
                  <option value="">Any Location</option>
                  {locations.map((location) => (
                    <option key={location} value={location}>{location}</option>
                  ))}
                </select>
              </div>
            </div>
          </form>
        </div>
      </div>

      {/* Volunteers table */}
      <div className="flex flex-col">
        <div className="-my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
          <div className="py-2 align-middle inline-block min-w-full sm:px-6 lg:px-8">
            <div className="shadow overflow-hidden border-b border-gray-200 sm:rounded-lg">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Volunteer
                    </th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Contact Info
                    </th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Training
                    </th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Status
                    </th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Hours
                    </th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Join Date
                    </th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Last Active
                    </th>
                    <th scope="col" className="relative px-6 py-3">
                      <span className="sr-only">Actions</span>
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {filteredVolunteers.length > 0 ? (
                    filteredVolunteers.map((volunteer) => (
                      <tr key={volunteer.id}>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="flex items-center">
                            <div className="flex-shrink-0 h-10 w-10">
                              <div className="h-10 w-10 rounded-full bg-blue-100 flex items-center justify-center">
                                <FaUser className="h-5 w-5 text-blue-500" />
                              </div>
                            </div>
                            <div className="ml-4">
                              <div className="text-sm font-medium text-gray-900">{volunteer.name}</div>
                              <div className="text-sm text-gray-500">{volunteer.city}, {volunteer.state}</div>
                            </div>
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="text-sm text-gray-900">{volunteer.email}</div>
                          <div className="text-sm text-gray-500">{volunteer.phone}</div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="text-sm text-gray-900">
                            {volunteer.training.join(', ')}
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                            volunteer.status === 'active' ? 'bg-green-100 text-green-800' : 
                            volunteer.status === 'pending' ? 'bg-yellow-100 text-yellow-800' : 
                            volunteer.status === 'on-leave' ? 'bg-blue-100 text-blue-800' : 
                            'bg-gray-100 text-gray-800'
                          }`}>
                            {volunteer.status}
                          </span>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                          {volunteer.hoursLogged}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                          {new Date(volunteer.joinDate).toLocaleDateString()}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                          {volunteer.lastActive ? new Date(volunteer.lastActive).toLocaleDateString() : '-'}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                          <div className="flex justify-end space-x-2">
                            <button 
                              onClick={() => openViewModal(volunteer)}
                              className="text-blue-600 hover:text-blue-900"
                              title="View Details"
                            >
                              <FaEye className="h-4 w-4" />
                            </button>
                            <button 
                              onClick={() => openEditModal(volunteer)}
                              className="text-indigo-600 hover:text-indigo-900"
                              title="Edit"
                            >
                              <FaEdit className="h-4 w-4" />
                            </button>
                            {volunteer.status === 'pending' && (
                              <>
                                <button 
                                  onClick={() => handleApprove(volunteer.id)}
                                  className="text-green-600 hover:text-green-900"
                                  title="Approve"
                                >
                                  <FaCheck className="h-4 w-4" />
                                </button>
                                <button 
                                  onClick={() => handleReject(volunteer.id)}
                                  className="text-red-600 hover:text-red-900"
                                  title="Reject"
                                >
                                  <FaTimes className="h-4 w-4" />
                                </button>
                              </>
                            )}
                          </div>
                        </td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td colSpan="8" className="px-6 py-4 text-center text-sm text-gray-500">
                        No volunteers found matching your criteria
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
              Showing <span className="font-medium">1</span> to <span className="font-medium">{filteredVolunteers.length}</span> of{' '}
              <span className="font-medium">{volunteers.length}</span> results
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
              <button className="bg-white border-gray-300 text-gray-500 hover:bg-gray-50 relative inline-flex items-center px-4 py-2 border text-sm font-medium">
                2
              </button>
              <button className="bg-white border-gray-300 text-gray-500 hover:bg-gray-50 hidden md:inline-flex relative items-center px-4 py-2 border text-sm font-medium">
                3
              </button>
              <span className="relative inline-flex items-center px-4 py-2 border border-gray-300 bg-white text-sm font-medium text-gray-700">
                ...
              </span>
              <button className="bg-white border-gray-300 text-gray-500 hover:bg-gray-50 relative inline-flex items-center px-4 py-2 border text-sm font-medium">
                8
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

      {/* View Volunteer Modal */}
      {isViewModalOpen && selectedVolunteer && (
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
                    <FaUser className="h-6 w-6 text-blue-600" />
                  </div>
                  <div className="mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left w-full">
                    <h3 className="text-lg leading-6 font-medium text-gray-900">{selectedVolunteer.name}</h3>
                    <div className="mt-4 grid grid-cols-1 gap-y-4 gap-x-4 sm:grid-cols-2">
                      <div>
                        <h4 className="text-sm font-medium text-gray-500">Contact Information</h4>
                        <p className="mt-1 text-sm text-gray-900">{selectedVolunteer.email}</p>
                        <p className="mt-1 text-sm text-gray-900">{selectedVolunteer.phone}</p>
                      </div>
                      <div>
                        <h4 className="text-sm font-medium text-gray-500">Location</h4>
                        <p className="mt-1 text-sm text-gray-900">{selectedVolunteer.city}, {selectedVolunteer.state}</p>
                      </div>
                      <div>
                        <h4 className="text-sm font-medium text-gray-500">Training</h4>
                        <p className="mt-1 text-sm text-gray-900">{selectedVolunteer.training.join(', ')}</p>
                      </div>
                      <div>
                        <h4 className="text-sm font-medium text-gray-500">Status</h4>
                        <p className="mt-1">
                          <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                            selectedVolunteer.status === 'active' ? 'bg-green-100 text-green-800' : 
                            selectedVolunteer.status === 'pending' ? 'bg-yellow-100 text-yellow-800' : 
                            selectedVolunteer.status === 'on-leave' ? 'bg-blue-100 text-blue-800' : 
                            'bg-gray-100 text-gray-800'
                          }`}>
                            {selectedVolunteer.status}
                          </span>
                        </p>
                      </div>
                      <div>
                        <h4 className="text-sm font-medium text-gray-500">Hours Logged</h4>
                        <p className="mt-1 text-sm text-gray-900">{selectedVolunteer.hoursLogged} hours</p>
                      </div>
                      <div>
                        <h4 className="text-sm font-medium text-gray-500">Join Date</h4>
                        <p className="mt-1 text-sm text-gray-900">{new Date(selectedVolunteer.joinDate).toLocaleDateString()}</p>
                      </div>
                      <div>
                        <h4 className="text-sm font-medium text-gray-500">Last Active</h4>
                        <p className="mt-1 text-sm text-gray-900">
                          {selectedVolunteer.lastActive ? new Date(selectedVolunteer.lastActive).toLocaleDateString() : 'Not active yet'}
                        </p>
                      </div>
                    </div>
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
                    openEditModal(selectedVolunteer);
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

      {/* Edit Volunteer Modal */}
      {isEditModalOpen && selectedVolunteer && (
        <div className="fixed inset-0 overflow-y-auto z-50">
          <div className="flex items-center justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
            <div className="fixed inset-0 transition-opacity" aria-hidden="true">
              <div className="absolute inset-0 bg-gray-500 opacity-75"></div>
            </div>
            <span className="hidden sm:inline-block sm:align-middle sm:h-screen" aria-hidden="true">&#8203;</span>
            <div className="inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full">
              <form>
                <div className="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
                  <div className="sm:flex sm:items-start">
                    <div className="mx-auto flex-shrink-0 flex items-center justify-center h-12 w-12 rounded-full bg-blue-100 sm:mx-0 sm:h-10 sm:w-10">
                      <FaEdit className="h-6 w-6 text-blue-600" />
                    </div>
                    <div className="mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left w-full">
                      <h3 className="text-lg leading-6 font-medium text-gray-900">Edit Volunteer</h3>
                      <div className="mt-4 grid grid-cols-1 gap-y-4 gap-x-4 sm:grid-cols-2">
                        <div>
                          <label htmlFor="name" className="block text-sm font-medium text-gray-700">Name</label>
                          <input
                            type="text"
                            name="name"
                            id="name"
                            defaultValue={selectedVolunteer.name}
                            className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                          />
                        </div>
                        <div>
                          <label htmlFor="email" className="block text-sm font-medium text-gray-700">Email</label>
                          <input
                            type="email"
                            name="email"
                            id="email"
                            defaultValue={selectedVolunteer.email}
                            className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                          />
                        </div>
                        <div>
                          <label htmlFor="phone" className="block text-sm font-medium text-gray-700">Phone</label>
                          <input
                            type="text"
                            name="phone"
                            id="phone"
                            defaultValue={selectedVolunteer.phone}
                            className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                          />
                        </div>
                        <div>
                          <label htmlFor="city" className="block text-sm font-medium text-gray-700">City</label>
                          <input
                            type="text"
                            name="city"
                            id="city"
                            defaultValue={selectedVolunteer.city}
                            className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                          />
                        </div>
                        <div>
                          <label htmlFor="state" className="block text-sm font-medium text-gray-700">State</label>
                          <input
                            type="text"
                            name="state"
                            id="state"
                            defaultValue={selectedVolunteer.state}
                            className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                          />
                        </div>
                        <div className="sm:col-span-2">
                          <label htmlFor="training" className="block text-sm font-medium text-gray-700">Training</label>
                          <div className="mt-2 space-y-2">
                            {trainingOptions.map(option => (
                              <div key={option} className="flex items-start">
                                <div className="flex items-center h-5">
                                  <input
                                    id={`training-${option}`}
                                    name={`training-${option}`}
                                    type="checkbox"
                                    defaultChecked={selectedVolunteer.training.includes(option)}
                                    className="focus:ring-blue-500 h-4 w-4 text-blue-600 border-gray-300 rounded"
                                  />
                                </div>
                                <div className="ml-3 text-sm">
                                  <label htmlFor={`training-${option}`} className="font-medium text-gray-700">{option}</label>
                                </div>
                              </div>
                            ))}
                          </div>
                        </div>
                        <div>
                          <label htmlFor="status" className="block text-sm font-medium text-gray-700">Status</label>
                          <select
                            id="status"
                            name="status"
                            defaultValue={selectedVolunteer.status}
                            className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm rounded-md"
                          >
                            <option value="active">Active</option>
                            <option value="pending">Pending</option>
                            <option value="on-leave">On Leave</option>
                            <option value="inactive">Inactive</option>
                          </select>
                        </div>
                        <div>
                          <label htmlFor="hoursLogged" className="block text-sm font-medium text-gray-700">Hours Logged</label>
                          <input
                            type="number"
                            name="hoursLogged"
                            id="hoursLogged"
                            defaultValue={selectedVolunteer.hoursLogged}
                            min="0"
                            className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                          />
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
                    Save
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
    </div>
  );
}

export default ManageVolunteers;
