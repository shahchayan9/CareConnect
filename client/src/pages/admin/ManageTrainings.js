import React, { useState, useEffect } from 'react';
import { 
  FaGraduationCap, 
  FaPlus, 
  FaEdit, 
  FaTrash, 
  FaEye, 
  FaFilter, 
  FaSearch,
  FaCalendarAlt,
  FaMapMarkerAlt,
  FaUsers,
  FaUserGraduate
} from 'react-icons/fa';

// Mock data for development
const mockTrainings = [
  {
    id: 1,
    title: 'Peer-to-Peer Basics',
    description: 'Foundational training for the NAMI Peer-to-Peer education program.',
    category: 'Core',
    startDate: '2025-03-10',
    endDate: '2025-03-15',
    location: 'NAMI Yolo Office',
    maxParticipants: 15,
    enrolledParticipants: 15,
    instructor: 'Admin User',
    durationHours: 8,
    status: 'completed',
    completionRate: 100
  },
  {
    id: 2,
    title: 'Crisis Intervention',
    description: 'Advanced training for handling mental health crisis situations.',
    category: 'Advanced',
    startDate: '2025-04-20',
    endDate: '2025-04-25',
    location: 'Davis Community Center',
    maxParticipants: 12,
    enrolledParticipants: 10,
    instructor: 'Admin User',
    durationHours: 12,
    status: 'in-progress',
    completionRate: 60
  },
  {
    id: 3,
    title: 'Family-to-Family Program',
    description: 'Educational program for family members of individuals with mental health conditions.',
    category: 'Specialized',
    startDate: '2025-05-10',
    endDate: '2025-05-20',
    location: 'Woodland Library',
    maxParticipants: 20,
    enrolledParticipants: 8,
    instructor: 'Admin User',
    durationHours: 16,
    status: 'scheduled',
    completionRate: 0
  },
  {
    id: 4,
    title: 'Community Outreach Skills',
    description: 'Training for effective community outreach and advocacy.',
    category: 'Advanced',
    startDate: '2025-06-05',
    endDate: '2025-06-07',
    location: 'West Sacramento Community Center',
    maxParticipants: 25,
    enrolledParticipants: 15,
    instructor: 'Admin User',
    durationHours: 6,
    status: 'scheduled',
    completionRate: 0
  },
  {
    id: 5,
    title: 'Crisis Intervention Advanced',
    description: 'Follow-up training to the basic crisis intervention course.',
    category: 'Advanced',
    startDate: '2025-04-30',
    endDate: '2025-05-02',
    location: 'NAMI Yolo Office',
    maxParticipants: 10,
    enrolledParticipants: 5,
    instructor: 'Admin User',
    durationHours: 8,
    status: 'scheduled',
    completionRate: 0
  },
  {
    id: 6,
    title: 'Peer Support Refresher',
    description: 'Refresher course for certified peer support specialists.',
    category: 'Continuing Education',
    startDate: '2025-05-15',
    endDate: '2025-05-15',
    location: 'Online (Zoom)',
    maxParticipants: 30,
    enrolledParticipants: 12,
    instructor: 'Admin User',
    durationHours: 2,
    status: 'scheduled',
    completionRate: 0
  }
];

function ManageTrainings() {
  const [trainings, setTrainings] = useState([]);
  const [filteredTrainings, setFilteredTrainings] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [filters, setFilters] = useState({
    category: '',
    status: '',
    instructor: ''
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedTraining, setSelectedTraining] = useState(null);
  const [isViewModalOpen, setIsViewModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [currentAction, setCurrentAction] = useState('');

  // Simulate API call to fetch trainings
  useEffect(() => {
    setLoading(true);
    setTimeout(() => {
      setTrainings(mockTrainings);
      setFilteredTrainings(mockTrainings);
      setLoading(false);
    }, 800);
  }, []);

  const handleSearch = (e) => {
    e.preventDefault();
    
    const filtered = trainings.filter(training => {
      const matchesSearch = training.title.toLowerCase().includes(searchTerm.toLowerCase()) || 
                           training.description.toLowerCase().includes(searchTerm.toLowerCase());
      
      const matchesCategory = filters.category ? 
                             training.category === filters.category : true;
      
      const matchesStatus = filters.status ? 
                           training.status === filters.status : true;
      
      const matchesInstructor = filters.instructor ? 
                             training.instructor === filters.instructor : true;
      
      return matchesSearch && matchesCategory && matchesStatus && matchesInstructor;
    });
    
    setFilteredTrainings(filtered);
  };

  const openViewModal = (training) => {
    setSelectedTraining(training);
    setIsViewModalOpen(true);
  };

  const openEditModal = (training) => {
    setSelectedTraining(training);
    setIsEditModalOpen(true);
    setCurrentAction('edit');
  };

  const openAddModal = () => {
    setSelectedTraining(null);
    setIsAddModalOpen(true);
    setCurrentAction('add');
  };

  const openDeleteModal = (training) => {
    setSelectedTraining(training);
    setIsDeleteModalOpen(true);
  };

  const closeModals = () => {
    setIsViewModalOpen(false);
    setIsEditModalOpen(false);
    setIsAddModalOpen(false);
    setIsDeleteModalOpen(false);
    setSelectedTraining(null);
  };

  const handleDelete = (id) => {
    // In a real app, this would make an API call
    const updatedTrainings = trainings.filter(training => training.id !== id);
    
    setTrainings(updatedTrainings);
    setFilteredTrainings(
      filteredTrainings.filter(training => training.id !== id)
    );
    
    closeModals();
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // In a real app, this would make an API call
    // For now, we'll just close the modal
    closeModals();
  };

  // Sample categories
  const categories = [
    'Core', 
    'Advanced', 
    'Specialized', 
    'Continuing Education'
  ];

  // Sample statuses
  const statuses = [
    'scheduled', 
    'in-progress', 
    'completed', 
    'cancelled'
  ];

  // Sample instructors
  const instructors = [
    'Admin User', 
    'Jane Smith', 
    'Michael Johnson'
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
            Manage Trainings
          </h2>
        </div>
        <div className="mt-4 flex md:mt-0 md:ml-4">
          <button
            type="button"
            onClick={openAddModal}
            className="ml-3 inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
          >
            <FaPlus className="-ml-1 mr-2 h-5 w-5" aria-hidden="true" />
            Add Training
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
                      placeholder="Search training by title or description"
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
                  {statuses.map((status) => (
                    <option key={status} value={status}>{status}</option>
                  ))}
                </select>
              </div>

              <div className="sm:col-span-2">
                <label htmlFor="instructor" className="block text-sm font-medium text-gray-700">
                  Instructor
                </label>
                <select
                  id="instructor"
                  value={filters.instructor}
                  onChange={(e) => setFilters({...filters, instructor: e.target.value})}
                  className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm rounded-md"
                >
                  <option value="">Any Instructor</option>
                  {instructors.map((instructor) => (
                    <option key={instructor} value={instructor}>{instructor}</option>
                  ))}
                </select>
              </div>
            </div>
          </form>
        </div>
      </div>

      {/* Trainings table */}
      <div className="flex flex-col">
        <div className="-my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
          <div className="py-2 align-middle inline-block min-w-full sm:px-6 lg:px-8">
            <div className="shadow overflow-hidden border-b border-gray-200 sm:rounded-lg">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Training
                    </th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Dates
                    </th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Location
                    </th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Enrollment
                    </th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Status
                    </th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Completion
                    </th>
                    <th scope="col" className="relative px-6 py-3">
                      <span className="sr-only">Actions</span>
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {filteredTrainings.length > 0 ? (
                    filteredTrainings.map((training) => (
                      <tr key={training.id}>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="flex items-center">
                            <div className="flex-shrink-0 h-10 w-10">
                              <div className="h-10 w-10 rounded-full bg-indigo-100 flex items-center justify-center">
                                <FaGraduationCap className="h-5 w-5 text-indigo-500" />
                              </div>
                            </div>
                            <div className="ml-4">
                              <div className="text-sm font-medium text-gray-900">{training.title}</div>
                              <div className="text-sm text-gray-500">{training.category}</div>
                            </div>
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="text-sm text-gray-900">
                            {new Date(training.startDate).toLocaleDateString()} - {new Date(training.endDate).toLocaleDateString()}
                          </div>
                          <div className="text-sm text-gray-500">{training.durationHours} hours</div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="text-sm text-gray-900">{training.location}</div>
                          <div className="text-sm text-gray-500">{training.instructor}</div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="text-sm text-gray-900">
                            {training.enrolledParticipants} / {training.maxParticipants}
                          </div>
                          <div className="text-sm text-gray-500">
                            {Math.round((training.enrolledParticipants / training.maxParticipants) * 100)}% enrolled
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                        <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                            training.status === 'scheduled' ? 'bg-blue-100 text-blue-800' : 
                            training.status === 'in-progress' ? 'bg-yellow-100 text-yellow-800' : 
                            training.status === 'completed' ? 'bg-green-100 text-green-800' : 
                            'bg-red-100 text-red-800'
                          }`}>
                            {training.status}
                          </span>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="w-full bg-gray-200 rounded-full h-2.5">
                            <div 
                              className={`h-2.5 rounded-full ${
                                training.completionRate >= 75 ? 'bg-green-600' :
                                training.completionRate >= 25 ? 'bg-yellow-500' :
                                'bg-blue-500'
                              }`} 
                              style={{ width: `${training.completionRate}%` }}
                            ></div>
                          </div>
                          <div className="text-xs text-center mt-1">
                            {training.completionRate}%
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                          <div className="flex justify-end space-x-2">
                            <button 
                              onClick={() => openViewModal(training)}
                              className="text-blue-600 hover:text-blue-900"
                              title="View Details"
                            >
                              <FaEye className="h-4 w-4" />
                            </button>
                            <button 
                              onClick={() => openEditModal(training)}
                              className="text-indigo-600 hover:text-indigo-900"
                              title="Edit"
                            >
                              <FaEdit className="h-4 w-4" />
                            </button>
                            <button 
                              onClick={() => openDeleteModal(training)}
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
                        No trainings found matching your criteria
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
              Showing <span className="font-medium">1</span> to <span className="font-medium">{filteredTrainings.length}</span> of{' '}
              <span className="font-medium">{trainings.length}</span> results
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

      {/* View Training Modal */}
      {isViewModalOpen && selectedTraining && (
        <div className="fixed inset-0 overflow-y-auto z-50">
          <div className="flex items-center justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
            <div className="fixed inset-0 transition-opacity" aria-hidden="true">
              <div className="absolute inset-0 bg-gray-500 opacity-75"></div>
            </div>
            <span className="hidden sm:inline-block sm:align-middle sm:h-screen" aria-hidden="true">&#8203;</span>
            <div className="inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full">
              <div className="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
                <div className="sm:flex sm:items-start">
                  <div className="mx-auto flex-shrink-0 flex items-center justify-center h-12 w-12 rounded-full bg-indigo-100 sm:mx-0 sm:h-10 sm:w-10">
                    <FaGraduationCap className="h-6 w-6 text-indigo-600" />
                  </div>
                  <div className="mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left w-full">
                    <h3 className="text-lg leading-6 font-medium text-gray-900">{selectedTraining.title}</h3>
                    <div className="mt-2">
                      <p className="text-sm text-gray-500">{selectedTraining.description}</p>
                    </div>
                    <div className="mt-4 grid grid-cols-1 gap-y-4 gap-x-4 sm:grid-cols-2">
                      <div>
                        <h4 className="text-sm font-medium text-gray-500">Category</h4>
                        <p className="mt-1 text-sm text-gray-900">{selectedTraining.category}</p>
                      </div>
                      <div>
                        <h4 className="text-sm font-medium text-gray-500">Duration</h4>
                        <p className="mt-1 text-sm text-gray-900">{selectedTraining.durationHours} hours</p>
                      </div>
                      <div>
                        <h4 className="text-sm font-medium text-gray-500">Dates</h4>
                        <p className="mt-1 text-sm text-gray-900">
                          {new Date(selectedTraining.startDate).toLocaleDateString()} - {new Date(selectedTraining.endDate).toLocaleDateString()}
                        </p>
                      </div>
                      <div>
                        <h4 className="text-sm font-medium text-gray-500">Location</h4>
                        <p className="mt-1 text-sm text-gray-900">{selectedTraining.location}</p>
                      </div>
                      <div>
                        <h4 className="text-sm font-medium text-gray-500">Instructor</h4>
                        <p className="mt-1 text-sm text-gray-900">{selectedTraining.instructor}</p>
                      </div>
                      <div>
                        <h4 className="text-sm font-medium text-gray-500">Status</h4>
                        <p className="mt-1">
                          <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                            selectedTraining.status === 'scheduled' ? 'bg-blue-100 text-blue-800' : 
                            selectedTraining.status === 'in-progress' ? 'bg-yellow-100 text-yellow-800' : 
                            selectedTraining.status === 'completed' ? 'bg-green-100 text-green-800' : 
                            'bg-red-100 text-red-800'
                          }`}>
                            {selectedTraining.status}
                          </span>
                        </p>
                      </div>
                      <div>
                        <h4 className="text-sm font-medium text-gray-500">Enrollment</h4>
                        <p className="mt-1 text-sm text-gray-900">
                          {selectedTraining.enrolledParticipants} / {selectedTraining.maxParticipants} ({Math.round((selectedTraining.enrolledParticipants / selectedTraining.maxParticipants) * 100)}%)
                        </p>
                      </div>
                      <div>
                        <h4 className="text-sm font-medium text-gray-500">Completion Rate</h4>
                        <p className="mt-1 text-sm text-gray-900">{selectedTraining.completionRate}%</p>
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
                    openEditModal(selectedTraining);
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

      {/* Add/Edit Training Modal */}
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
                    <div className="mx-auto flex-shrink-0 flex items-center justify-center h-12 w-12 rounded-full bg-indigo-100 sm:mx-0 sm:h-10 sm:w-10">
                      {currentAction === 'add' ? (
                        <FaPlus className="h-6 w-6 text-indigo-600" />
                      ) : (
                        <FaEdit className="h-6 w-6 text-indigo-600" />
                      )}
                    </div>
                    <div className="mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left w-full">
                      <h3 className="text-lg leading-6 font-medium text-gray-900">
                        {currentAction === 'add' ? 'Add New Training' : 'Edit Training'}
                      </h3>
                      <div className="mt-4 grid grid-cols-1 gap-y-4 gap-x-4 sm:grid-cols-2">
                        <div className="sm:col-span-2">
                          <label htmlFor="title" className="block text-sm font-medium text-gray-700">Title</label>
                          <input
                            type="text"
                            name="title"
                            id="title"
                            defaultValue={selectedTraining ? selectedTraining.title : ''}
                            className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                            required
                          />
                        </div>
                        <div className="sm:col-span-2">
                          <label htmlFor="description" className="block text-sm font-medium text-gray-700">Description</label>
                          <textarea
                            name="description"
                            id="description"
                            defaultValue={selectedTraining ? selectedTraining.description : ''}
                            rows={3}
                            className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                          />
                        </div>
                        <div>
                          <label htmlFor="category" className="block text-sm font-medium text-gray-700">Category</label>
                          <select
                            id="category"
                            name="category"
                            defaultValue={selectedTraining ? selectedTraining.category : ''}
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
                          <label htmlFor="durationHours" className="block text-sm font-medium text-gray-700">Duration (hours)</label>
                          <input
                            type="number"
                            name="durationHours"
                            id="durationHours"
                            defaultValue={selectedTraining ? selectedTraining.durationHours : ''}
                            min="1"
                            className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                            required
                          />
                        </div>
                        <div>
                          <label htmlFor="startDate" className="block text-sm font-medium text-gray-700">Start Date</label>
                          <input
                            type="date"
                            name="startDate"
                            id="startDate"
                            defaultValue={selectedTraining ? selectedTraining.startDate : ''}
                            className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                            required
                          />
                        </div>
                        <div>
                          <label htmlFor="endDate" className="block text-sm font-medium text-gray-700">End Date</label>
                          <input
                            type="date"
                            name="endDate"
                            id="endDate"
                            defaultValue={selectedTraining ? selectedTraining.endDate : ''}
                            className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                            required
                          />
                        </div>
                        <div>
                          <label htmlFor="location" className="block text-sm font-medium text-gray-700">Location</label>
                          <input
                            type="text"
                            name="location"
                            id="location"
                            defaultValue={selectedTraining ? selectedTraining.location : ''}
                            className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                            required
                          />
                        </div>
                        <div>
                          <label htmlFor="instructor" className="block text-sm font-medium text-gray-700">Instructor</label>
                          <select
                            id="instructor"
                            name="instructor"
                            defaultValue={selectedTraining ? selectedTraining.instructor : ''}
                            className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm rounded-md"
                            required
                          >
                            <option value="">Select an instructor</option>
                            {instructors.map((instructor) => (
                              <option key={instructor} value={instructor}>{instructor}</option>
                            ))}
                          </select>
                        </div>
                        <div>
                          <label htmlFor="maxParticipants" className="block text-sm font-medium text-gray-700">Max Participants</label>
                          <input
                            type="number"
                            name="maxParticipants"
                            id="maxParticipants"
                            defaultValue={selectedTraining ? selectedTraining.maxParticipants : ''}
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
                            defaultValue={selectedTraining ? selectedTraining.status : 'scheduled'}
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
                    {currentAction === 'add' ? 'Add Training' : 'Save Changes'}
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
      {isDeleteModalOpen && selectedTraining && (
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
                    <h3 className="text-lg leading-6 font-medium text-gray-900">Delete Training</h3>
                    <div className="mt-2">
                      <p className="text-sm text-gray-500">
                        Are you sure you want to delete <strong>{selectedTraining.title}</strong>? This action cannot be undone.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
              <div className="bg-gray-50 px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse">
                <button
                  type="button"
                  onClick={() => handleDelete(selectedTraining.id)}
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
    </div>
  );
}

export default ManageTrainings;
