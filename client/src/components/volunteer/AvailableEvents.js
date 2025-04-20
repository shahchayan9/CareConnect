import React from 'react';
import { Link } from 'react-router-dom';
import { FaCalendarAlt, FaClock, FaMapMarkerAlt, FaUserFriends } from 'react-icons/fa';

function AvailableEvents({ events }) {
  if (!events || events.length === 0) {
    return (
      <div className="text-center py-6 text-gray-500">
        No available events found
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {events.map((event) => (
        <div key={event.id} className="border border-gray-200 rounded-lg p-4 hover:bg-gray-50">
          <h3 className="text-md font-medium text-gray-900">{event.title}</h3>
          
          <div className="mt-2 text-sm text-gray-500 space-y-1">
            <div className="flex items-center">
              <FaCalendarAlt className="mr-2 text-gray-400" />
              {new Date(event.date).toLocaleDateString('en-US', {
                weekday: 'short',
                month: 'short', 
                day: 'numeric'
              })}
            </div>
            
            <div className="flex items-center">
              <FaClock className="mr-2 text-gray-400" />
              {event.startTime} - {event.endTime}
            </div>
            
            <div className="flex items-center">
              <FaMapMarkerAlt className="mr-2 text-gray-400" />
              {event.location}
            </div>
            
            <div className="flex items-center">
              <FaUserFriends className="mr-2 text-gray-400" />
              {event.volunteersNeeded} volunteer(s) needed
            </div>
          </div>
          
          <div className="mt-3 flex justify-between">
            <Link 
              to={`/volunteer/events/${event.id}`}
              className="text-sm font-medium text-blue-600 hover:text-blue-800"
            >
              View Details
            </Link>
            
            <button 
              className="text-sm font-medium text-green-600 hover:text-green-800"
            >
              Sign Up
            </button>
          </div>
        </div>
      ))}
    </div>
  );
}

export default AvailableEvents;
