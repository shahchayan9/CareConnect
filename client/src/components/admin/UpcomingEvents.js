import React from 'react';
import { Link } from 'react-router-dom';
import { FaCalendarAlt, FaClock, FaMapMarkerAlt, FaUsers } from 'react-icons/fa';

function UpcomingEvents({ events }) {
  if (!events || events.length === 0) {
    return (
      <div className="text-center py-6 text-gray-500">
        No upcoming events
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {events.map((event) => (
        <div key={event.id} className="border border-gray-200 rounded-lg p-4 hover:bg-gray-50">
          <div className="flex justify-between items-start">
            <h3 className="text-md font-medium text-gray-900">{event.title}</h3>
            <span className={`px-2 py-1 text-xs rounded-full ${
              event.status === 'scheduled' ? 'bg-green-100 text-green-800' : 
              event.status === 'canceled' ? 'bg-red-100 text-red-800' : 
              'bg-blue-100 text-blue-800'
            }`}>
              {event.status}
            </span>
          </div>
          
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
              <FaUsers className="mr-2 text-gray-400" />
              {event.assignedVolunteers.length} / {event.requiredVolunteers} volunteers
            </div>
          </div>
          
          <div className="mt-3 flex justify-between">
            <Link 
              to={`/admin/events/${event.id}`}
              className="text-sm font-medium text-blue-600 hover:text-blue-800"
            >
              View Details
            </Link>
            
            {event.assignedVolunteers.length < event.requiredVolunteers && (
              <button 
                className="text-sm font-medium text-green-600 hover:text-green-800"
              >
                Assign Volunteers
              </button>
            )}
          </div>
        </div>
      ))}
      
      <Link 
        to="/admin/events"
        className="block text-center text-sm font-medium text-blue-600 hover:text-blue-800 mt-4"
      >
        View All Events
      </Link>
    </div>
  );
}

export default UpcomingEvents;
