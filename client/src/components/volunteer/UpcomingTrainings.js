import React from 'react';
import { Link } from 'react-router-dom';
import { FaCalendarAlt, FaClock, FaMapMarkerAlt } from 'react-icons/fa';

function UpcomingTrainings({ trainings }) {
  if (!trainings || trainings.length === 0) {
    return (
      <div className="text-center py-6 text-gray-500">
        No upcoming trainings
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {trainings.map((training) => (
        <div key={training.id} className="border border-gray-200 rounded-lg p-4 hover:bg-gray-50">
          <div className="flex justify-between items-start">
            <h3 className="text-md font-medium text-gray-900">{training.title}</h3>
            <span className={`px-2 py-1 text-xs rounded-full ${
              training.status === 'confirmed' ? 'bg-green-100 text-green-800' : 
              training.status === 'pending' ? 'bg-yellow-100 text-yellow-800' : 
              'bg-blue-100 text-blue-800'
            }`}>
              {training.status}
            </span>
          </div>
          
          <div className="mt-2 text-sm text-gray-500 space-y-1">
            <div className="flex items-center">
              <FaCalendarAlt className="mr-2 text-gray-400" />
              {new Date(training.date).toLocaleDateString('en-US', {
                weekday: 'short',
                month: 'short', 
                day: 'numeric'
              })}
            </div>
            
            <div className="flex items-center">
              <FaClock className="mr-2 text-gray-400" />
              {training.startTime} - {training.endTime}
            </div>
            
            <div className="flex items-center">
              <FaMapMarkerAlt className="mr-2 text-gray-400" />
              {training.location}
            </div>
          </div>
          
          <div className="mt-3">
            <Link 
              to={`/volunteer/trainings/${training.id}`}
              className="text-sm font-medium text-blue-600 hover:text-blue-800"
            >
              View Details
            </Link>
          </div>
        </div>
      ))}
    </div>
  );
}

export default UpcomingTrainings;
