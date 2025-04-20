import React, { useState } from 'react';
import { FaSearch } from 'react-icons/fa';

function SearchVolunteers() {
  const [searchTerm, setSearchTerm] = useState('');
  const [filters, setFilters] = useState({
    trainingType: '',
    status: '',
    location: ''
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    // Implement search functionality
    // Would typically call an API with search params
    console.log('Searching for:', searchTerm, 'with filters:', filters);
  };

  return (
    <div className="mb-6">
      <form onSubmit={handleSubmit}>
        {/* Search input */}
        <div className="flex mb-4">
          <div className="relative flex-grow">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <FaSearch className="text-gray-400" />
            </div>
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Search volunteers..."
              className="pl-10 pr-4 py-2 w-full border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <button
            type="submit"
            className="ml-2 px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            Search
          </button>
        </div>

        {/* Filters */}
        <div className="flex flex-wrap gap-4">
          <select
            value={filters.trainingType}
            onChange={(e) => setFilters({...filters, trainingType: e.target.value})}
            className="px-3 py-2 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="">Any Training</option>
            <option value="peer-to-peer">Peer-to-Peer</option>
            <option value="family-to-family">Family-to-Family</option>
            <option value="crisis-support">Crisis Support</option>
            <option value="community-outreach">Community Outreach</option>
          </select>

          <select
            value={filters.status}
            onChange={(e) => setFilters({...filters, status: e.target.value})}
            className="px-3 py-2 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="">Any Status</option>
            <option value="active">Active</option>
            <option value="pending">Pending Approval</option>
            <option value="on-leave">On Leave</option>
            <option value="inactive">Inactive</option>
          </select>

          <select
            value={filters.location}
            onChange={(e) => setFilters({...filters, location: e.target.value})}
            className="px-3 py-2 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="">Any Location</option>
            <option value="davis">Davis</option>
            <option value="woodland">Woodland</option>
            <option value="winters">Winters</option>
            <option value="west-sacramento">West Sacramento</option>
          </select>
        </div>
      </form>
    </div>
  );
}

export default SearchVolunteers;
